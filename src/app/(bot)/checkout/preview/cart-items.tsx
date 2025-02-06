import { CartItem, type CartItemType } from '@/components/cart-item'
import { ListSkeleton } from '@/components/layout/cart/list-skeleton' // TODO: make shared
import { routeNames } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useClearCartMutation } from '@/lib/api/hooks'
import { toast } from 'sonner'

interface CartItemsProps {
  loading: boolean
  cartProducts: CartItemType[]
}

export function CartItems({ loading, cartProducts }: CartItemsProps) {
  const router = useRouter()

  const t = useTranslations()

  const [clearMeta, clearCart] = useClearCartMutation()

  const handleClearClick = () => {
    clearCart().then((result) => {
      if (result.error) {
        toast.error('Не удалось очистить корзину')
        return
      }
      router.replace(routeNames.catalog)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between px-2 pt-4 pb-4">
        <h2 className="font-medium">{t('Checkout.preview.yourOrder')}</h2>
        <button color="secondary" className="text-[13px] text-gray-500" onClick={handleClearClick}>
          {t('Common.actions.deleteAll')}
        </button>
      </div>
      {loading ? (
        <ListSkeleton len={1} />
      ) : (
        <ul className="scroll-bar max-h-[400px] overflow-x-hidden overflow-y-auto pt-4">
          {cartProducts.map((item) => (
            <CartItem key={item.product.id} quantity={item.quantity} product={item.product} />
          ))}
        </ul>
      )}
    </div>
  )
}
