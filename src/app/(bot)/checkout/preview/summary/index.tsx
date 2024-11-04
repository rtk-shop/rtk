import ContentLoader from 'react-content-loader'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/helpers'

import styles from './styles.module.scss'

interface SummaryProps {
  loading: boolean
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Summary({ loading, submitLoading, orderCreationErr }: SummaryProps) {
  const cartPrice = 2300

  const data = {
    globalData: {
      usdCourse: 41.1
    }
  }

  return (
    <div className="px-2.5 pb-2 pt-4">
      <div className="mb-4">
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
          <p className="flex items-center justify-between text-lg font-medium leading-none">
            <span>Итого:</span>
            <span>{formatPrice(cartPrice)} грн</span>
          </p>
        )}
      </div>
      <Button fullWidth color="accept" type="submit" loading={submitLoading || loading}>
        Подтвердить заказ
      </Button>
      {orderCreationErr && (
        <div>
          <p>shwow error</p>
        </div>
      )}
      <p className="mt-2 px-5 text-center text-[14px] leading-none text-gray-400">
        Подтверждая заказ, я принимаю условия пользовательского соглашения
      </p>
    </div>
  )
}
