import { Loader } from '@/components/ui/loader'
import { LogoLoader } from '@/components/ui/logo-loader'

export default function Page() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <LogoLoader size={180} />
      <div className="mt-6">
        <div className="animate-fade-in opacity-0 delay-1000">
          <Loader color="dark" />
        </div>
      </div>
    </div>
  )
}
