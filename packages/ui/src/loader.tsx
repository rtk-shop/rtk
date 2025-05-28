import { cva } from 'cva'

const loader = cva('aspect-square animate-spin rounded-full border-solid', {
  variants: {
    adaptive: {
      true: 'size-auto border-2',
      false: 'w-10 border-[6px]'
    },
    color: {
      dark: 'border-black border-r-white',
      light: 'border-white border-r-inherit'
    }
  },
  defaultVariants: {
    adaptive: false
  }
})

export function Loader({ adaptive, color }: { adaptive?: boolean; color: 'dark' | 'light' }) {
  return <div className={loader({ adaptive, color })} />
}
