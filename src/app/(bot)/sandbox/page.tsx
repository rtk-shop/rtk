import dynamic from 'next/dynamic'

const SandboxInner =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('./inner'), { ssr: false })
    : () => null

export default function Sandbox() {
  return <SandboxInner />
}
