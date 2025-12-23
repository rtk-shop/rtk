import { cva } from 'cva'

const loader = cva('aspect-square animate-spin rounded-full border-solid', {
  variants: {
    adaptive: {
      true: 'size-auto border-2',
      false: 'w-10 border-[6px]'
    },
    color: {
      primary: 'border-white border-r-black',
      accept: 'border-r-green-lime border-black',
      danger: 'border-white border-r-red-500',
      secondary: 'border-black border-r-white'
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
  color: 'primary' | 'secondary' | 'accept' | 'danger'
}) {
  return <div className={loader({ adaptive, color })} />
}
