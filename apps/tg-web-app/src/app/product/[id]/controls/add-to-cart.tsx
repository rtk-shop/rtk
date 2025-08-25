'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useAddCartItemMutation } from '@/lib/api/hooks'

export function AddToCartButton({ productId, inStock }: { productId: string; inStock: boolean }) {
  const t = useTranslations('Product')
  const [{ fetching }, addCartItem] = useAddCartItemMutation()

  const handleButtonClick = () => {
    addCartItem({
      productId,
      quantity: 1
    }).then((result) => {
      if (result.error) {
        toast.error(t('toasts.addToCartErr'), {
          duration: 1500,
          richColors: true
        })
        return
      }
    })
  }

  return (
    <div className="mt-5 mb-2">
      <Button
        fullWidth
        loading={fetching}
        onClick={handleButtonClick}
        className="h-[53px]"
        disabled={!inStock}
        startIcon={<Icon name="common/cart" className="mr-2.5 fill-white text-[26px]" />}
      >
        {t('addToCart')}
      </Button>
    </div>
  )
}
