import { CartItem, type CartItemProps } from '@/components/cart/item'
import { ListSkeleton } from '@/components/layout/cart/list-skeleton' // TODO: make shared
import { routeNames } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useClearCartMutation } from '@/lib/api/hooks'
import { toast } from 'sonner'

export function CartItems({
  loading,
  cartProducts
}: {
  loading: boolean
  cartProducts: CartItemProps[]
}) {
  const router = useRouter()
  const t = useTranslations()

  const [_, clearCart] = useClearCartMutation()

  const handleClearClick = () => {
    clearCart().then((result) => {
      if (result.error) {
        toast.error('Не удалось очистить корзину', {
          duration: 2000,
          richColors: true
        })
        return
      }
      router.replace(routeNames.catalog)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between px-2 pt-4 pb-4">
        <h2 className="font-medium">{t('Checkout.preview.yourOrder')}</h2>
        <button type="button" className="text-[13px] text-gray-500" onClick={handleClearClick}>
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
