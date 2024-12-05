import Link from 'next/link'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { AmountController } from '@/components/ui/amount-controller'
import { formatPrice } from '@/lib/helpers'
import { routeNames } from '@/lib/constants'
import { useCartStore } from '@/providers/cart-store-provider'
import { useTranslations } from 'next-intl'
import { Icon } from '../ui/icon'

export type CartItemType = {
  id: string
  title: string
  currentPrice: number
  preview: string
}

interface CartItemProps {
  amount: number
  product: CartItemType
}

export function CartItem({ product, amount }: CartItemProps) {
  const t = useTranslations('Common')

  const [{ remove, updateAmount }] = useCartStore((state) => state)

  const { id, title, preview, currentPrice } = product

  const handleAmountChange = (_: string, n: number): void => {
    updateAmount(id, n)
  }

  const handleProductRemove = () => {
    remove(id)
  }

  return (
    <li className="relative mb-8 flex after:absolute after:-bottom-4 after:left-1/2 after:h-[1px] after:w-9/12 after:-translate-x-2/4 after:bg-gray-300 last:mb-0 after:last:hidden">
      <div className="relative mr-2 w-full max-w-32">
        <Link href={routeNames.product + id} className="rounded-lg">
          <ImagePlaceholder src={preview} altText={title} width={216} height={270} />
        </Link>
      </div>
      <div className="w-full min-w-0 max-w-md pt-3">
        <Link
          title={title}
          href={routeNames.product + id}
          className="clear-both mb-2 line-clamp-2 h-[33px] text-ellipsis whitespace-normal text-sm font-semibold leading-4 text-black no-underline"
        >
          {title}
        </Link>
        <span className="text-sm font-medium text-gray-500">
          {t('nouns.price')}:&nbsp;&nbsp;{formatPrice(currentPrice)}&nbsp;₴
        </span>
        <p className="text-[15px] font-semibold leading-none">
          {amount}&nbsp;шт:&nbsp;&nbsp;{formatPrice(amount * currentPrice)}&nbsp;₴
        </p>
        <div className="mt-6 flex justify-between">
          <AmountController min={1} max={100} amount={amount} onChange={handleAmountChange} />
          <IconButton
            disableRipple
            onClick={handleProductRemove}
            className="rounded-lg !bg-gray-100 px-3 text-lg !text-gray-500 active:text-black"
          >
            <Icon name="action/trash" />
          </IconButton>
        </div>
      </div>
    </li>
  )
}
