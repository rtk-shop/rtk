import { Loader } from '@repo/ui'

export default function Loading() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="animate-in fade-in zoom-in">
        <Loader color="secondary" />
      </div>
    </div>
  )
}
