import ContentLoader from 'react-content-loader'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@repo/utils'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

interface SummaryProps {
  loading: boolean
  totalSum: number | undefined
  submitLoading: boolean
}

export function Summary({ loading, submitLoading, totalSum = 0 }: SummaryProps) {
  const t = useTranslations('Checkout')
  const {
    formState: { errors }
  } = useFormContext()

  const hasErr = !!Object.keys(errors).length

  return (
    <div className="px-2.5 pt-4 pb-2">
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
          <p className="flex items-center justify-between text-lg leading-none font-medium">
            <span>{t('preview.total')}:</span>
            <span>{formatPrice(totalSum)} грн</span>
          </p>
        )}
      </div>
      <Button
        fullWidth
        color="accept"
        disabled={hasErr}
        type="submit"
        loading={submitLoading || loading}
      >
        {t('preview.submitOrder')}
      </Button>
      {hasErr && (
        <p className="text-md mt-2 px-5 text-center leading-none font-semibold text-red-600">
          {t('fillForm')}
        </p>
      )}
      <p className="mt-2 px-5 text-center text-sm leading-none text-gray-400">
        {t('preview.offerta')}
      </p>
    </div>
  )
}
