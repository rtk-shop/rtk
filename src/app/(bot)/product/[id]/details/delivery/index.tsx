import Image from 'next/image'
import styles from './styles.module.scss'

export function Delivery() {
  return (
    <div>
      <p className={styles.title}>Способы доставки</p>
      <ul className={styles.deliveryList}>
        <li className={styles.deliveryItem}>
          <div className={styles.info}>
            <Image src="/icons/bus.png" width={30} height={30} alt={'В отделение «Нова пошта»'} />
            <p>Передать на автобус</p>
          </div>
          <p>по тарифам перевозчика</p>
        </li>
        <li className={styles.deliveryItem}>
          <div className={styles.info}>
            <Image
              src="/icons/novaposta.svg"
              width={30}
              height={30}
              alt={'Курьер Новой Почты по вашему адресу'}
            />
            <p>В отделение «Нова пошта»</p>
          </div>
          <p>по тарифам компании</p>
        </li>
      </ul>
    </div>
  )
}
