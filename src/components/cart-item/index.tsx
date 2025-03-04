import { useRouter } from 'next/navigation'
import { useAppState } from '@/stores/app/store'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { AmountController } from '@/components/ui/amount-controller'
import { routeNames } from '@/lib/constants'
import { useTranslations } from 'next-intl'
import { FormatPrice } from '@/components/ui/format-price'
import { Icon } from '../ui/icon'
import { toast } from 'sonner'
import {
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useReduceCartItemQuantityMutation
} from '@/lib/api/hooks'

export type CartItemProps = {
  quantity: number
  product: {
    id: string
    title: string
    currentPrice: number
    preview: string
  }
}

export function CartItem({ product, quantity }: CartItemProps) {
  const t = useTranslations('Common')
  const router = useRouter()

  const closeCart = useAppState((state) => state.closeCart)

  const handleRedirect = () => {
    router.push(routeNames.product + id)
    closeCart()
  }

  const [addItemMeta, addCartItem] = useAddCartItemMutation()
  const [_, reduceCartItem] = useReduceCartItemQuantityMutation()
  const [__, removeCartItem] = useRemoveCartItemMutation()

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
        <div onClick={handleRedirect} className="rounded-lg">
          <ImagePlaceholder src={preview} altText={title} width={216} height={270} />
        </div>
      </div>
      <div className="w-full max-w-md min-w-0 pt-3">
        <p
          onClick={handleRedirect}
          className="clear-both mb-2 line-clamp-2 h-[33px] text-sm leading-4 font-semibold text-ellipsis whitespace-normal text-black no-underline"
        >
          {title}
        </p>
        <span className="text-sm font-medium text-gray-500">
          {t('nouns.price')}: <FormatPrice price={currentPrice} />
        </span>
        <p className="text-[15px] leading-none font-semibold">
          {quantity}&nbsp;шт:&nbsp;&nbsp;
          <FormatPrice price={quantity * currentPrice} />
        </p>
        <div className="mt-6 flex justify-between">
          <AmountController
            min={1}
            max={100}
            amount={quantity}
            onChange={handleAmountChange}
            loading={addItemMeta.fetching}
          />
          <IconButton
            hapticFeedback="light"
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
