import { type ReactNode } from 'react'

export function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 flex items-center gap-2 pl-0.5 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
    >
      {children}
    </label>
  )
}
