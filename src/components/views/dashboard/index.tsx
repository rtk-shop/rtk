import { Currency } from './currency'

export function DashboardView() {
  return (
    <div className="p-8">
      <div style={{ display: 'flex' }}>
        <Currency />
      </div>
    </div>
  )
}
