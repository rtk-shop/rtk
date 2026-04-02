import { Loader } from '@/components/ui/loader'

export function Loaders() {
  return (
    <div>
      <h2>Loaders</h2>
      <ul className="flex *:mr-2 *:flex *:flex-col *:items-center">
        <li>
          <p>size=xs</p>
          <Loader size="xs" />
        </li>
        <li>
          <p>size=sm</p>
          <Loader size="sm" />
        </li>
        <li>
          <p>size=md</p>
          <Loader size="md" />
        </li>
        <li>
          <p>size=inline + size-10</p>
          <div className="size-10">
            <Loader size="inline" />
          </div>
        </li>
        <li className="">
          <p>size=global</p>
          <div className="size-10">
            <Loader size="lg" />
          </div>
        </li>
      </ul>
    </div>
  )
}
