import { cva } from 'cva'

const loader = cva('aspect-square animate-spin rounded-full border-solid', {
  variants: {
    adaptive: {
      true: 'size-auto border-2',
      false: 'w-10 border-[6px]'
    },
    color: {
      dark: 'border-white border-r-black',
      light: 'border-white border-r-inherit'
    }
  },
  defaultVariants: {
    adaptive: false
  }
})

export interface LoaderProps {
  adaptive?: boolean
  color: 'dark' | 'light'
}

export function Loader({ adaptive, color }: LoaderProps) {
  return <div className={loader({ adaptive, color })} />
}
