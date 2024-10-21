import { cva } from 'cva'

const loader = cva('aspect-square rounded-full border-solid border-neutral-200 animate-spin', {
  variants: {
    adaptive: {
      true: 'size-auto border-2 border-r-inherit',
      false: 'w-10 border-6 border-r-black'
    }
  },
  defaultVariants: {
    adaptive: false
  }
})

export function Loader({ adaptive }: { adaptive?: boolean }) {
  return <div className={loader({ adaptive })} />
}
