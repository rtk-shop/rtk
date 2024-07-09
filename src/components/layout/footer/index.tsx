import { memo } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import PhoneIcon from '../../../../public/icons/phone.svg'
import { SvgIcon } from '@/components/ui/svg-icon'

import styles from './styles.module.scss'

export const Footer = memo(function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.root}>
        <div className={styles.brand}>
          <Link href="#">
            <div className={styles.logo}>
              <Image
                src="/assets/logo.svg"
                alt="логотип"
                priority={false}
                width={190}
                height={41}
              />
            </div>
          </Link>
          <div className={styles.logoBox}>
            <a className={styles.phone} href={'tel:' + process.env.NEXT_PUBLIC_CONTACT_PHONE}>
              <SvgIcon className={styles.phoneIcon}>
                <PhoneIcon />
              </SvgIcon>
              {process.env.NEXT_PUBLIC_CONTACT_PHONE}
            </a>
          </div>
        </div>
        <div className={clsx(styles.column, styles.category)}>
          <h5>Категории</h5>
          <ul>
            <li>
              <Link href="#">
                <p>Сумки</p>
              </Link>
            </li>
            <li>
              <Link href="#">
                <p>Кошельки</p>
              </Link>
            </li>
            <li>
              <Link href="#">
                <p>Чемоданы</p>
              </Link>
            </li>
            <li>
              <Link href="#">
                <p>Женские</p>
              </Link>
            </li>
            <li>
              <Link href="#">
                <p>Мужские</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={clsx(styles.column, styles.info)}>
          <h5>Информация</h5>
          <ul>
            <li>
              <Link href="/terms/payment-and-delivery">
                <p>Доставка</p>
              </Link>
            </li>
            <li>
              <Link href="#">
                <p>Обратная связь</p>
              </Link>
            </li>
            <li>
              <Link href="/terms/terms-of-site-use">
                <p>Условия использования сайта</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h5>Связь с нами</h5>
          <ul className={styles.contactDetails}>
            <li>
              <p>Телефон:</p>
              <span>{process.env.NEXT_PUBLIC_CONTACT_PHONE}</span>
            </li>
            <li>
              <p>Дни работы:</p>
              <span>Пн-Ср-Чт-Сб</span>
            </li>
            <li>
              <p>Прием заказов:</p>
              <span>с 8:00 до 13:00</span>
            </li>
            <li>
              <p>Мы находимся:</p>
              <span>г. Харьков</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.subFooter}>
        <span>{process.env.NEXT_PUBLIC_APP_NAME} © 2024</span>
      </div>
    </footer>
  )
})
