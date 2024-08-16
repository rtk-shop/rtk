import ContentLoader from 'react-content-loader'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/helpers'
import { useCartPrice } from '@/apollo/cache/cart'
import { useGlobalDataQuery } from '@/graphql/global/_gen_/globalData.query'

import styles from './styles.module.scss'

interface SummaryProps {
  loading: boolean
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Summary({ loading, submitLoading, orderCreationErr }: SummaryProps) {
  const cartPrice = useCartPrice()

  const { data } = useGlobalDataQuery()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {loading ? (
          <ContentLoader
            backgroundColor="#eeeeee"
            foregroundColor="#e1e1e1"
            width="100%"
            height="29"
            viewBox="0 0 450 29"
          >
            <rect x="0" y="0" rx="6" ry="6" width="80" height="27" />
            <rect x="71%" y="0" rx="6" ry="6" width="120" height="27" />
          </ContentLoader>
        ) : (
          <div className={styles.totalPrice}>
            <b>Итого:</b>
            <span>
              <span>{formatPrice(cartPrice)} $&nbsp;</span>
              {data && (
                <span className={styles.uahPrice}>
                  • {formatPrice(cartPrice * data.globalData.usdCourse)} грн
                </span>
              )}
            </span>
          </div>
        )}
      </div>
      <Button fullWidth color="accept" type="submit" loading={submitLoading || loading}>
        Подтвердить заказ
      </Button>
      {orderCreationErr && (
        <div className={styles.error}>
          <b>Внимание!</b>
          <p>Произошла ошибка, повторите попытку позже</p>
        </div>
      )}
      <div className={styles.conditions}>
        <p>Подтверждая заказ, я принимаю условия пользовательского соглашения</p>
      </div>
    </div>
  )
}
