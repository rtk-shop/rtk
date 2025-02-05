'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { toast } from 'sonner'
import { useAddCartItemMutation } from '@/lib/api/hooks'

export function AddToCartButton({ productID, inStock }: { productID: string; inStock: boolean }) {
  const [result, addCartItem] = useAddCartItemMutation()

  const handleClick = () => {
    addCartItem({
      productId: productID,
      quantity: 1
    }).then((result) => {
      if (result.error) {
        toast.error('Не удалось добавить товар в корзину')
        return
      }

      toast.success('Товар добавлен в корзину')
    })
  }

  return (
    <div className="mt-5 mb-2.5">
      <Button
        fullWidth
        color="secondary"
        loading={result.fetching}
        onClick={handleClick}
        className="group rounded-xl border-none bg-black py-3 leading-none font-medium text-white"
        disabled={!inStock}
        startIcon={
          <Icon
            name="common/cart"
            className="mr-2.5 fill-white text-[30px] transition-all group-active:scale-125"
          />
        }
      >
        {inStock ? 'Добавить в корзину' : 'Нет в наличии'}
      </Button>
    </div>
  )
}
