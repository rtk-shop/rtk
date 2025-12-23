import Image from 'next/image'
import { Icon } from '@/components/ui/icon'
import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'
import { useTranslations } from 'next-intl'
import { usePageState } from '../model/state'
import { Button } from '@/components/ui/button'

export function OrderSuccessDrawer() {
  const t = useTranslations('Checkout.successDrawer')
  const router = useRouter()

  const orderId = usePageState((state) => state.newOrderId)
  const isOpen = usePageState((state) => state.successOrderDrawerOpen)
  const reset = usePageState((state) => state.reset)

  const handleCompleteClick = () => {
    if (orderId) {
      router.replace(routeNames.order + orderId)
    }
    reset()
  }

  return (
    <Drawer open={isOpen} position="bottom">
      <div className="rounded-t-2xl bg-white px-4 pt-7 pb-7">
        <Image
          src="/icons/tada.webp"
          width={100}
          height={100}
          unoptimized
          alt="tada icon"
          className="m-auto mb-4"
        />
        {/*  */}
        <h1 className="text-center text-2xl font-medium">{t('title')}</h1>
        {/*  */}
        <ul className="mt-5 text-black *:flex *:justify-center">
          <li className="mb-3">
            <Icon name="checkout/letter" className="text-[33px]" />
            <p className="ml-3 max-w-60 leading-4">{t('hint1')}</p>
          </li>
          <li>
            <Icon name="checkout/box-taped" className="fill-black text-[33px]" />
            <p className="ml-3 max-w-60 leading-4">
              {t.rich('hint2', {
                highlight: (chunks) => <span className="underline">{chunks}</span>
              })}
            </p>
          </li>
        </ul>
        <div className="mt-5 flex justify-center px-3">
          <Button onClick={handleCompleteClick} fullWidth>
            {t('review')}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
