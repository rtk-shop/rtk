'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'
import styles from './styles.module.css'

export function ServerFetchError({ message }: { message: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-col items-center">
          <Image
            src="/icons/pensive.webp"
            width={90}
            height={90}
            unoptimized
            alt="sad icon"
            className="mb-4"
          />
          <p className="max-w-4/6 text-center text-xl leading-none font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}
