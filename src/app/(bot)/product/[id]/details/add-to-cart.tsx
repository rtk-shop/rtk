'use client'

import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/components/ui/svg-icon'
import { useCartStore } from '@/providers/cart-store-provider'
import CartIcon from '../../../../../../public/icons/cart.svg'

export function AddToCartButton({ productID, inStock }: { productID: string; inStock: boolean }) {
  const [{ addItem }] = useCartStore((state) => state)

  const handleClick = () => {
    addItem({
      productId: productID,
      amount: 1
    })
  }

  return (
    <div className="mb-2.5 mt-5">
      <Button
        fullWidth
        color="secondary"
        onClick={handleClick}
        className="group rounded-xl border-none bg-black py-3 font-medium leading-none text-white"
        disabled={!inStock}
        startIcon={
          <SvgIcon className="mr-2.5 fill-white text-[30px] transition-all group-active:scale-125">
            <CartIcon />
          </SvgIcon>
        }
      >
        {inStock ? 'Добавить в корзину' : 'Нет в наличии'}
      </Button>
    </div>
  )
}
