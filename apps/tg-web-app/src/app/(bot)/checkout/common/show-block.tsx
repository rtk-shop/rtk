import { ReactElement } from 'react'

interface ShowBlockProps {
  as: string
  current: string
  children: ReactElement
}

export function ShowBlock({ as, current, children }: ShowBlockProps) {
  if (as !== current) return null
  return children
}
