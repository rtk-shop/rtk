import { Orders } from './orders'

export default function Profile() {
  return (
    <div className="h-dvh px-2 pb-12">
      <div className="flex h-full flex-col">
        <div className="mt-auto">
          <Orders />
        </div>
      </div>
    </div>
  )
}
