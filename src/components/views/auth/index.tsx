import { useState } from 'react'
import { LogIn } from './logIn'
import { LangSwitcher } from '@/components/lang-switcher'

export function AuthView() {
  const [_, setLogInMode] = useState(true)

  const handleModeChange = () => {
    setLogInMode((prev) => !prev)
  }

  return (
    <div className="h-dvh">
      <div className="relative flex h-full flex-col-reverse flex-wrap lg:flex-row">
        <div className="p-5 pb-10 lg:basis-3/5 lg:self-center lg:pb-0">
          <div className="absolute right-4 top-4">
            <LangSwitcher />
          </div>
          <LogIn onSignUp={handleModeChange} />
        </div>
        <div className="grow bg-gray-300 bg-suitcases bg-cover bg-center bg-no-repeat lg:size-full lg:basis-2/5" />
      </div>
    </div>
  )
}
