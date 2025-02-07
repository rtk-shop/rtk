import Link from 'next/link'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { AmountController } from '@/components/ui/amount-controller'
import { formatPrice } from '@/lib/helpers'
import { routeNames } from '@/lib/constants'
import { useTranslations } from 'next-intl'
import { Icon } from '../ui/icon'
import { toast } from 'sonner'
import {
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useReduceCartItemQuantityMutation
} from '@/lib/api/hooks'

export type CartItemType = {
  quantity: number
  product: {
    id: string
    title: string
    currentPrice: number
    preview: string
  }
}

export function CartItem({ product, quantity }: CartItemType) {
  const t = useTranslations('Common')

  const [addItemMeta, addCartItem] = useAddCartItemMutation()
  const [reduceItemMeta, reduceCartItem] = useReduceCartItemQuantityMutation()
  const [_, removeCartItem] = useRemoveCartItemMutation()

  const { id, title, preview, currentPrice } = product

  const handleAmountChange = (type: 'add' | 'sub', _: number): void => {
    if (type === 'add') {
      addCartItem({
        productId: id,
        quantity: 1
      }).then((result) => {
        if (result.error) {
          toast.error('Не удалось изменить количество', {
            duration: 2000,
            richColors: true
          })
        }
      })
    } else {
      reduceCartItem({
        productId: id
      }).then((result) => {
        if (result.error) {
          toast.error('Не удалось изменить количество', {
            duration: 2000,
            richColors: true
          })
        }
      })
    }
  }

  const handleRemoveClick = () => {
    removeCartItem({
      productId: id
    }).then((result) => {
      if (result.error) {
        toast.error('Не удалось удалить товар', {
          duration: 2000,
          richColors: true
        })
        return
      }
    })
  }

  return (
    <li className="relative mb-8 flex after:absolute after:-bottom-4 after:left-1/2 after:h-[1px] after:w-9/12 after:-translate-x-2/4 after:bg-gray-300 last:mb-0 last:after:hidden">
      <div className="relative mr-2 w-full max-w-32">
        <Link href={routeNames.product + id} className="rounded-lg">
          <ImagePlaceholder src={preview} altText={title} width={216} height={270} />
        </Link>
      </div>
      <div className="w-full max-w-md min-w-0 pt-3">
        <Link
          title={title}
          href={routeNames.product + id}
          className="clear-both mb-2 line-clamp-2 h-[33px] text-sm leading-4 font-semibold text-ellipsis whitespace-normal text-black no-underline"
        >
          {title}
        </Link>
        <span className="text-sm font-medium text-gray-500">
          {t('nouns.price')}:&nbsp;&nbsp;{formatPrice(currentPrice)}&nbsp;₴
        </span>
        <p className="text-[15px] leading-none font-semibold">
          {quantity}&nbsp;шт:&nbsp;&nbsp;{formatPrice(quantity * currentPrice)}&nbsp;₴
        </p>
        <div className="mt-6 flex justify-between">
          <AmountController min={1} max={100} amount={quantity} onChange={handleAmountChange} />
          <IconButton
            disableRipple
            onClick={handleRemoveClick}
            className="rounded-lg bg-gray-100! px-3 text-lg text-gray-500! active:text-black"
          >
            <Icon name="action/trash" />
          </IconButton>
        </div>
      </div>
    </li>
  )
}
