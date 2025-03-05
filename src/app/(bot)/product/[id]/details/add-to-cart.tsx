'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { toast } from 'sonner'
import { useAddCartItemMutation } from '@/lib/api/hooks'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/constants'

export function AddToCartButton({ productID, inStock }: { productID: string; inStock: boolean }) {
  const router = useRouter()
  const [result, addCartItem] = useAddCartItemMutation()

  const handleClick = () => {
    addCartItem({
      productId: productID,
      quantity: 1
    }).then((result) => {
      if (result.error) {
        toast.error('Не удалось добавить товар в корзину', {
          duration: 1500,
          richColors: true
        })
        return
      }

      toast.success('Товар добавлен в корзину', {
        duration: 1500,
        cancel: {
          label: 'В корзину',
          onClick: () => {
            router.push(routeNames.checkout)
          }
        }
      })
    })
  }

  return (
    <div className="mt-5 mb-2.5">
      <Button
        fullWidth
        loading={result.fetching}
        onClick={handleClick}
        className="h-[53px]"
        disabled={!inStock}
        startIcon={
          <Icon name="common/cart" className="mr-2.5 fill-white text-[30px] transition-all" />
        }
      >
        {inStock ? 'Добавить в корзину' : 'Нет в наличии'}
      </Button>
    </div>
  )
}
