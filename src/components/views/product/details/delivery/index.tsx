import clsx from 'clsx'
import Image from 'next/image'

import styles from './styles.module.scss'

interface DeliveryProps {
  free: boolean
}

export function Delivery({ free }: DeliveryProps) {
  return (
    <ul className={styles.container}>
      <li className={styles.deliveryItem}>
        <div className={styles.info}>
          <Image
            src="/icons/novaposta.svg"
            width={30}
            height={30}
            alt={'В отделение «Нова пошта»'}
          />
          <p>В отделение «Нова пошта»</p>
        </div>
        <p className={clsx(free && styles.freeDelivery)}>{free ? 'Бесплатно' : 'от 100 ₴'}</p>
      </li>
      <li className={styles.deliveryItem}>
        <div className={styles.info}>
          <Image
            src="/icons/novaposta.svg"
            width={30}
            height={30}
            alt={'Курьер Новой Почты по вашему адресу'}
          />
          <p>Курьер по вашему адресу</p>
        </div>
        <p>по тарифам перевозчика</p>
      </li>
      <li className={styles.deliveryItem}>
        <div className={styles.info}>
          <Image
            src="/assets/icons/ukrposta.svg"
            width={31}
            height={31}
            alt={'В отделение «Укрпошта»'}
          />
          <p>В отделение «Укрпошта»</p>
        </div>
        <p className={clsx(free && styles.freeDelivery)}>
          {free ? 'Бесплатно' : 'по тарифам перевозчика'}
        </p>
      </li>
    </ul>
  )
}
