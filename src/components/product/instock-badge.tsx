import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'
import { useTranslations } from 'next-intl'

const badge = cva(
  'mr-1 flex content-center items-center justify-center rounded-full text-white select-none',
  {
    variants: {
      inStock: {
        true: 'bg-green-light p-1',
        false: 'bg-gray-400'
      }
    }
  }
)

export function InstockBadge({ inStock }: { inStock: boolean }) {
  const t = useTranslations('Common.nouns')

  return (
    <div className="flex items-center pb-0.5">
      <div className={badge({ inStock })}>
        {inStock ? (
          <Icon name="common/check" className="text-xs" />
        ) : (
          // fix safari fixed flex item size
          <div style={{ width: 15, height: 15 }} />
        )}
      </div>
      <div>
        <span className="text-sm font-medium">{inStock ? t('inStock') : t('outStock')}</span>
      </div>
    </div>
  )
}
