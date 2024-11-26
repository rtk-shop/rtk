import { Icon } from '@/components/ui/icon'
import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { usePageState } from '../model/state'

export function ErrorModal() {
  const t = useTranslations('Checkout.errorModal')
  const router = useRouter()

  const isOpen = usePageState((state) => state.errorOrderModalOpen)
  const errorOptions = usePageState((state) => state.errorOptions)
  const onErrorModal = usePageState((state) => state.onErrorModal)

  const isSubmitErr = errorOptions?.kind !== 'submit'

  const handleModalAction = () => {
    if (isSubmitErr) router.back()
    onErrorModal(false)
  }

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleModalAction}>
      <div className="relative rounded-t-2xl bg-white px-4 pb-7 pt-9">
        <p>{isSubmitErr}</p>
        <div className="mb-2 flex justify-center">
          <Icon name="action/warning" className="text-[100px] text-yellow-500" />
        </div>
        {/*  */}
        <div className="mb-4 text-center">
          <h1 className="mb-1 text-2xl font-medium">{t('title')}</h1>
          <p className="text-lg leading-none text-gray-500">
            {!isSubmitErr ? t('submitMessage') : t('subTitle')}
          </p>
        </div>
        <button
          onClick={handleModalAction}
          className="absolute right-4 top-4 rounded-lg bg-slate-100 px-2 py-px text-sm text-gray-700"
        >
          {t('action')}
        </button>
      </div>
    </Drawer>
  )
}
