import { cva } from 'cva'

const widgetContainer = cva('rounded-lg bg-slate-100 px-2 py-1.5')

export function Widget({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={widgetContainer({ className })}>
      <div className="flex h-full flex-col">
        <p className="mb-2 text-sm font-medium tracking-tighter text-gray-800">{title}</p>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
