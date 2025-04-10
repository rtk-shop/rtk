import { Loader } from '@/components/ui/loader'

export function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader color="dark" />
    </div>
  )
}
