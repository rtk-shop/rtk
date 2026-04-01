import { cva } from 'cva'

const loader = cva('aspect-square animate-spin rounded-full border-solid', {
  variants: {
    adaptive: {
      true: 'size-auto border-2',
      false: 'w-10 border-[6px]'
    },
    color: {
      primary: 'border-white border-r-black',
      secondary: 'border-black border-r-slate-200',
      accept: 'border-r-green-lime border-black',
      ghost: 'border-black border-r-slate-100'
    }
  },
  defaultVariants: {
    adaptive: false
  }
})

export function Loader({
  adaptive,
  color
}: {
  adaptive?: boolean
  color: 'primary' | 'secondary' | 'accept' | 'ghost'
}) {
  return <div className={loader({ adaptive, color })} />
}
