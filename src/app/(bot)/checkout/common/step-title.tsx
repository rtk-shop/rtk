import { memo, type ReactNode } from 'react'
import { cva } from 'cva'
import { Icon } from '@/components/ui/icon'

interface StepTitleProps {
  step: number
  valid: boolean
  isEdit: boolean
  children: ReactNode
  onEdit(): void
}

const container = cva('relative rounded-lg px-2.5 py-5', {
  variants: {
    expand: {
      true: 'mb-0 pb-0 transition-none',
      false: 'bg-gray-200 transition-colors delay-300 duration-300'
    }
  }
})

const inner = cva('flex select-none items-center justify-start rounded-lg', {
  variants: {
    expand: {
      true: 'mb-5'
    }
  }
})

const expandIcon = cva('ml-auto text-[26px] transition-all duration-300', {
  variants: {
    expand: {
      true: 'rotate-0',
      false: 'rotate-180'
    }
  }
})

const stepBadge = cva(
  'flex select-none content-center items-center justify-center rounded-full p-1 text-sm font-semibold leading-none text-white transition-colors',
  {
    variants: {
      expand: {
        true: 'bg-black transition-none',
        false: 'bg-gray-400 delay-300 duration-300'
      },
      valid: {
        true: 'bg-green-light',
        false: 'size-6'
      }
    }
  }
)

export const StepTitle = memo(function StepTitle({
  step,
  valid,
  isEdit,
  children,
  onEdit
}: StepTitleProps) {
  const handleTitleClick = () => {
    onEdit()
  }

  return (
    <div className={container({ expand: isEdit })} onClick={handleTitleClick}>
      <div className={inner({ expand: isEdit })}>
        <div className={stepBadge({ expand: isEdit, valid })}>
          {valid ? <Icon name="common/check" className="text-base" /> : <span>{step}</span>}
        </div>
        {/*  */}
        <h2 className="ml-2 font-medium">{children}</h2>
        <Icon name="common/arrow" className={expandIcon({ expand: isEdit })} />
      </div>
    </div>
  )
})
