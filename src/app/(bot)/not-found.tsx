import Link from 'next/link'
import { routeNames } from '@/lib/constants'
import { useTranslations } from 'next-intl'

import styles from '@/styles/not-found.module.css'

export default function NotFound() {
  const t = useTranslations('Common')

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <div title="404" className={styles.nf}>
        404
      </div>
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
