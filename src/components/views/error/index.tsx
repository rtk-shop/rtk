import React from 'react'
import Link from 'next/link'
import ArrowIcon from '../../../../public/icons/expand-arrow.svg'
import { routeNames } from '@/utils/navigation'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

export function ErrorView({ kind }: { kind: '404' | '500' }) {
  const { t, lang } = useTranslation('common')

  console.log(lang)

  const title =
    kind === '404' ? (
      <h3 className={styles[lang === 'ru' ? 'title' : 'title-ua']}>{t('page404.title')}</h3>
    ) : (
      <h3 className={styles[lang === 'ru' ? 'title-500' : 'title-500-ua']}>{t('page500.title')}</h3>
    )

  const body =
    kind === '404' ? (
      <p>
        {t('page404.subTitle1')}{' '}
        <span className={styles[lang === 'ru' ? 'subtitle' : 'subtitle-ua']}>
          {t('page404.subTitle2')}
        </span>{' '}
        {t('page404.subTitle3')}
      </p>
    ) : (
      <div className={styles.body500}>
        <p>{t('page500.subTitle1')}</p>
        <p>{t('page500.subTitle2')}</p>
      </div>
    )

  console.log(`page${kind}.action`)

  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>
        <div className={styles.box} />
        {title}
        {body}
        <p className={styles.actionWrapper}>
          <ArrowIcon className={styles.arrowIcon} />
          <Link className={styles.actionLink} href={routeNames.root}>
            {t(`page${kind}.action`)}
          </Link>
        </p>
      </div>
    </div>
  )
}
