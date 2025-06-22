import { Button } from '@repo/ui'
import { Icon } from '@/components/ui/icon'
import { toast } from 'sonner'
import { useAddCartItemMutation } from '@/lib/api/hooks'

export function AddToCartButton({ productId, inStock }: { productId: string; inStock: boolean }) {
  const [{ fetching }, addCartItem] = useAddCartItemMutation()

  const handleClick = () => {
    addCartItem({
      productId,
      quantity: 1
    }).then((result) => {
      if (result.error) {
        toast.error('Не удалось добавить товар в корзину', {
          duration: 1500,
          richColors: true
        })
        return
      }
    })
  }

  return (
    <div className="mt-5 mb-2.5">
      <Button
        fullWidth
        loading={fetching}
        onClick={handleClick}
        className="h-[53px]"
        disabled={!inStock}
        startIcon={
          <Icon name="common/cart" className="mr-2.5 fill-white text-[30px] transition-all" />
        }
      >
        Добавить в корзину
      </Button>
    </div>
  )
}
