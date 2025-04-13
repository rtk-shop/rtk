import { lazy } from 'react'

export default function Sandbox() {
  if (process.env.NODE_ENV === 'development') {
    const SandboxInner = lazy(() => import('./inner'))
    return <SandboxInner />
  }

  return <></>
}
