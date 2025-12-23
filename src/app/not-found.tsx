import Link from 'next/link'
import { routeNames } from '@/lib/routes'
import { GlitchTitle } from '@/components/ui/glitch-title'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('Common')

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <GlitchTitle title={404} />
      <p className="text mb-3 max-w-60 text-center font-medium text-gray-500">{t('p404.title')}</p>
      <Link
        replace
        href={routeNames.catalog}
        className="rounded-xl bg-stone-800 px-2.5 py-2 font-medium"
      >
        {t('p404.action')}
      </Link>
    </div>
  )
}
