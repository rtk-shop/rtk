import { useRouter } from 'next/navigation'
import { useAppState } from '@/stores/app/store'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { AmountController } from '@/components/ui/amount-controller'
import { routeNames } from '@/lib/routes'
import { useTranslations } from 'next-intl'
import { FormatPrice } from '@/components/ui/format-price'
import { Icon } from '@/components/ui/icon'
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
    basePrice: number
    preview: string
    sizeName: string
  }
}

export function CartItem({ product, quantity }: CartItemProps) {
  const router = useRouter()
  const t = useTranslations('Common')

  const closeCart = useAppState((state) => state.closeCart)

  const { id, title, preview, currentPrice, sizeName } = product

  const handleRedirect = () => {
    router.push(routeNames.product + id)
    closeCart()
  }

  const [addItemMeta, addCartItem] = useAddCartItemMutation()
  const [_, reduceCartItem] = useReduceCartItemQuantityMutation()
  const [__, removeCartItem] = useRemoveCartItemMutation()

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

  const handleRemoveCartItem = () => {
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
          <ImagePlaceholder src={preview} alt={title} width={216} height={270} />
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
          {sizeName === 'none' ? (
            <>
              {t('nouns.price')}: <FormatPrice price={currentPrice} />
            </>
          ) : (
            <>
              {t('nouns.size')} — <span className="text-base text-gray-600">{sizeName}</span>
            </>
          )}
        </span>
        <p className="leading-none font-semibold">
          {quantity}&nbsp;шт:&nbsp;&nbsp;
          <FormatPrice price={quantity * currentPrice} />
        </p>
        <div className="mt-4 flex justify-between">
          <AmountController
            min={1}
            max={100}
            amount={quantity}
            onChange={handleAmountChange}
            loading={addItemMeta.fetching}
          />
          <IconButton
            hapticFeedback="light"
            onClick={handleRemoveCartItem}
            className="rounded-lg bg-gray-100! px-3 text-lg text-gray-600!"
          >
            <Icon name="action/trash" />
          </IconButton>
        </div>
      </div>
    </li>
  )
}
