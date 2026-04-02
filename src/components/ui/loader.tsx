import { cva, type VariantProps } from 'cva'

const loader = cva(
  'aspect-square shrink-0 animate-spin rounded-full border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        inline: 'size-auto border-2',
        xs: 'w-3 border-2',
        sm: 'w-5 border-2',
        md: 'w-7 border-2',
        lg: 'w-10 border-4'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
)

export type LoaderProps = VariantProps<typeof loader>

export function Loader({ size }: LoaderProps) {
  return <div className={loader({ size })} />
}
