'use client'

import { GlitchTitle } from '@/components/ui/glitch-title'
import styles from '@/styles/page-500.module.css'

export default function GlobalError() {
  return (
    <html>
      <body className={styles.body}>
        <div className={styles.container}>
          <GlitchTitle title={500} />
          <p className={styles.text}>Сервіс недоступний</p>
        </div>
      </body>
    </html>
  )
}
