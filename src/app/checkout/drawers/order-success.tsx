import Image from 'next/image'
import { Box } from '@/components/ui/box'
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
      <Box className="rounded-t-2xl bg-white px-4 pt-7 pb-7">
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
        <Box as="ul" className="mt-5 text-black *:flex *:justify-center">
          <Box as="li" className="mb-3">
            <Icon name="checkout/letter" className="text-[33px]" />
            <p className="ml-3 max-w-60 leading-4">{t('hint1')}</p>
          </Box>
          <Box as="li">
            <Icon name="checkout/box-taped" className="fill-black text-[33px]" />
            <p className="ml-3 max-w-60 leading-4">
              {t.rich('hint2', {
                highlight: (chunks) => <span className="underline">{chunks}</span>
              })}
            </p>
          </Box>
        </Box>
        <Box flex="row" justify="center" className="mt-5 px-3">
          <Button onClick={handleCompleteClick} fullWidth>
            {t('review')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
