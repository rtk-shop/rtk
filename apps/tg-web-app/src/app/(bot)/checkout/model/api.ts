import { providerNames } from './constants'
import { type Settlement } from './types'

export const searchSettlements = async (cityName: string): Promise<Settlement[]> => {
  const params = new URLSearchParams({
    provider: providerNames.novaPoshta,
    city_name: cityName.toLocaleLowerCase()
  })

  const resp = await fetch(`${process.env.NEXT_PUBLIC_DELIVERY_API}/search-settlements?${params}`)

  const data = await resp.json()
  return data as Settlement[]
}
