import Image from 'next/image'
import { SvgIcon } from '@/components/ui/svg-icon'
import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/constants'
import { useTranslations } from 'next-intl'
import { useCartStore } from '@/providers/cart-store-provider'
import LetterIcon from '../../../../../public/icons/letter.svg'
import LocationIcon from '../../../../../public/icons/box-taped.svg'

export function OrderSuccessModal({ open }: { open: boolean }) {
  const t = useTranslations('Checkout.successModal')
  const router = useRouter()
  const [clear] = useCartStore((state) => state.clear)

  const handleComplete = () => {
    router.replace(routeNames.profile)
    clear()
  }

  return (
    <Drawer open={open} position="bottom" onClose={handleComplete}>
      <div className="rounded-t-2xl bg-white px-4 pb-7 pt-7">
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
            <SvgIcon className="fill-gray-600 text-[33px]">
              <LetterIcon />
            </SvgIcon>
            <p className="ml-3 max-w-60 leading-4">{t('hint1')}</p>
          </li>
          <li>
            <SvgIcon className="fill-gray-500 text-[33px]">
              <LocationIcon />
            </SvgIcon>
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
