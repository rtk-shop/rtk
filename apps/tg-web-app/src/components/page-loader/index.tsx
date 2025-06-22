import { Loader } from '@repo/ui'

export function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader color="secondary" />
    </div>
  )
}
