import { ElementType, ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'cva'

const boxVariants = cva('', {
  variants: {
    flex: {
      row: 'flex flex-row',
      col: 'flex flex-col',
      inline: 'inline-flex'
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch'
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      between: 'justify-between',
      end: 'justify-end'
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      4: 'gap-4'
    }
  }
})

export type BoxOwnProps = VariantProps<typeof boxVariants> & {
  as?: ElementType
  className?: string
}

export type BoxProps<C extends ElementType> = BoxOwnProps &
  Omit<ComponentPropsWithRef<C>, keyof BoxOwnProps>

export function Box<C extends ElementType = 'div'>({
  as,
  flex,
  align,
  justify,
  gap,
  className,
  ...props
}: BoxProps<C>) {
  const Comp = as || 'div'

  const variantClasses = flex ? boxVariants({ flex, align, justify, gap }) : ''

  return <Comp className={cn(variantClasses, className)} {...props} />
}
