import { ReactNode, ReactElement } from 'react'

export interface ConditionalRenderProps {
  condition: boolean
  wrap: (child: ReactNode) => ReactElement
  children: ReactNode
}

export function ConditionalRender({ condition, wrap, children }: ConditionalRenderProps) {
  return condition ? wrap(children) : <>{children}</>
}
