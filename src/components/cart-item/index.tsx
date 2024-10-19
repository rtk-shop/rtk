import Link from 'next/link'
import TrashIcon from '../../../public/icons/trash.svg'
import { SvgIcon } from '../ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { AmountController } from '@/components/ui/amount-controller'
import { formatPrice } from '@/lib/helpers'
import { routeNames, generateProductLink } from '@/lib/navigation'
import { updateItemAmount, removeFromCart } from '@/apollo/cache/cart'
import useTranslation from 'next-translate/useTranslation'

export type CartItemType = {
  id: string
  slug: string
  title: string
  currentPrice: number
  preview: string
}

interface CartItemProps {
  amount: number
  product: CartItemType
}

export function CartItem({ product, amount }: CartItemProps) {
  const { t } = useTranslation('common')

  const { id, slug, title, preview, currentPrice } = product

  const handleAmountChange = (_: string, n: number): void => {
    updateItemAmount(id, n)
  }

  const handleProductRemove = () => {
    removeFromCart(id)
  }

  return (
    <li className="relative mb-8 flex after:absolute after:-bottom-4 after:left-1/2 after:h-0.5 after:w-2/3 after:-translate-x-2/4 after:bg-gray-300 after:last:hidden">
      <div className="relative mr-5 min-h-44 w-full min-w-44">
        <Link href={generateProductLink(routeNames.product, id, slug)} className="rounded-lg">
          <ImagePlaceholder src={preview} altText={title} />
        </Link>
      </div>
      <div className="w-full min-w-0 max-w-md pt-3">
        <Link
          title={title}
          href={generateProductLink(routeNames.product, id, slug)}
          className="clear-both mb-2 line-clamp-2 h-[35px] text-ellipsis whitespace-normal text-sm font-semibold leading-4 text-black no-underline"
        >
          {title}
        </Link>
        <span className="text-[14px] font-medium text-gray-500">
          {t('price')}:&nbsp;&nbsp;{formatPrice(currentPrice)}&nbsp;$
        </span>
        <p className="text-[15px] font-semibold leading-none">
          {amount}&nbsp;шт:&nbsp;&nbsp;{formatPrice(amount * currentPrice)}&nbsp;$
        </p>
        <div className="mt-6 flex justify-between">
          <AmountController min={1} max={100} amount={amount} onChange={handleAmountChange} />
          <IconButton
            disableRipple
            onClick={handleProductRemove}
            aria-label={`Удалить "${title}"`}
            className="rounded-lg bg-gray-100 fill-gray-400 px-3 text-lg hover:fill-black"
          >
            <SvgIcon>
              <TrashIcon />
            </SvgIcon>
          </IconButton>
        </div>
      </div>
    </li>
  )
}
