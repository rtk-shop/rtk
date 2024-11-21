import { Icon } from '@/components/ui/icon'
import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { usePageState } from '../model/state'

export function ErrorModal() {
  const t = useTranslations('Checkout.successModal')
  const router = useRouter()

  const isOpen = usePageState((state) => state.errorOrderModalOpen)
  const onErrorModal = usePageState((state) => state.onErrorModal)

  const handleBack = () => {
    router.back()
    onErrorModal(false)
  }

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleBack}>
      <div className="rounded-t-2xl bg-white px-4 py-7">
        <div className="mb-2 flex justify-center">
          <Icon name="action/warning" className="text-[100px] text-yellow-500" />
        </div>
        {/*  */}
        <div className="mb-4 text-center">
          <h1 className="mb-1 text-2xl font-medium">Что-то пошло не так..</h1>
          <p className="text-lg leading-none text-gray-500">
            На данный момент создать заказ не возможно
          </p>
        </div>

        <button onClick={handleBack} className="m-auto flex items-center text-base">
          <Icon name="common/arrow" className="-rotate-90 text-[23px]" />
          <span className="underline">Вернуться назад</span>
        </button>
      </div>
    </Drawer>
  )
}
