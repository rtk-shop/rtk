import Image from 'next/image'
import { Icon } from '@/components/ui/icon'
import { useEffect } from 'react'
import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'
import { useTranslations } from 'next-intl'
import { usePageState } from '../model/state'

export function OrderSuccessDrawer() {
  const t = useTranslations('Checkout.successModal')
  const router = useRouter()

  const isOpen = usePageState((state) => state.successOrderDrawerOpen)
  const onSucessDrawerOpen = usePageState((state) => state.onSucessDrawerOpen)

  useEffect(() => {
    router.prefetch(routeNames.profile)
  }, [router])

  const handleComplete = () => {
    router.replace(routeNames.profile)
    onSucessDrawerOpen(false)
  }

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleComplete}>
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
        <ul className="mt-5 text-gray-600 *:flex *:justify-center">
          <li className="mb-3">
            <Icon name="checkout/letter" className="text-[33px]" />
            <p className="ml-3 max-w-60 leading-4">{t('hint1')}</p>
          </li>
          <li>
            <Icon name="checkout/box-taped" className="fill-gray-500 text-[33px]" />
            <p className="ml-3 max-w-60 leading-4">
              {t.rich('hint2', {
                highlight: (chunks) => (
                  <span onClick={handleComplete} className="text-lime-600 underline">
                    {chunks}
                  </span>
                )
              })}
            </p>
          </li>
        </ul>
      </div>
    </Drawer>
  )
}
