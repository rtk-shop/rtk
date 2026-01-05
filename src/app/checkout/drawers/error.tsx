import { Icon } from '@/components/ui/icon'
import { Box } from '@/components/ui/box'
import { Drawer } from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { usePageState } from '../model/state'

export function OrderErrorDrawer() {
  const t = useTranslations('Checkout.errorModal')
  const router = useRouter()

  const isOpen = usePageState((state) => state.errorOrderDrawerOpen)
  const errorOptions = usePageState((state) => state.errorOptions)
  const onErrorDrawerOpen = usePageState((state) => state.onErrorDrawerOpen)

  const isSubmitErr = errorOptions?.kind !== 'submit'

  const handleModalAction = () => {
    if (isSubmitErr) router.back()
    onErrorDrawerOpen(false)
  }

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleModalAction}>
      <Box className="relative rounded-t-2xl bg-white px-4 pt-9 pb-7">
        <p>{isSubmitErr}</p>
        <Box flex="row" justify="center" className="mb-2">
          <Icon name="action/warning" className="text-[100px] text-yellow-500" />
        </Box>
        {/*  */}
        <Box className="mb-4 text-center">
          <h1 className="mb-1 text-2xl font-medium">{t('title')}</h1>
          <p className="text-lg leading-none text-gray-500">
            {!isSubmitErr ? t('submitMessage') : t('subTitle')}
          </p>
        </Box>
        <button
          onClick={handleModalAction}
          className="absolute top-4 right-4 rounded-lg bg-slate-100 px-2 py-px text-sm text-gray-700"
        >
          {t('action')}
        </button>
      </Box>
    </Drawer>
  )
}
