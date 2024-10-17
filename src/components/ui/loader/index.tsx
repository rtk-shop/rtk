import { cva } from 'cva'

const loader = cva(
  'w-10 aspect-square rounded-full border-6 border-solid border-neutral-200 border-r-black animate-spin',
  {
    variants: {
      adaptive: {
        true: 'size-auto border-2 border-r-inherit'
      }
    },
    defaultVariants: {
      adaptive: false
    }
  }
)

export function Loader({ adaptive }: { adaptive?: boolean }) {
  return <div className={loader({ adaptive })} />
}
