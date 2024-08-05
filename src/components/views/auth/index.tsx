import { useState } from 'react'
import { LogIn } from './logIn'
import { SignUp } from './signUp'
import { LangSwitcher } from '@/components/lang-switcher'

import styles from './styles.module.scss'

export function AuthView() {
  const [logInMode, setLogInMode] = useState(false)

  const handleModeChange = () => {
    setLogInMode((prev) => !prev)
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.auth}>
          <div className={styles.langWrapper}>
            <LangSwitcher />
          </div>
          {logInMode ? (
            <LogIn onSignUp={handleModeChange} />
          ) : (
            <SignUp onLogIn={handleModeChange} />
          )}
        </div>
        <div className={styles.banner} />
      </div>
    </div>
  )
}
