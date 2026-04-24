import { Box } from '@/components/ui/box'
import { routeNames } from '@/lib/routes'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import Link from 'next/link'

export function Navigation({
  menu,
  favorites,
  cart
}: {
  cart: React.ReactNode
  menu: React.ReactNode
  favorites: React.ReactNode
}) {
  return (
    <Box className="fixed bottom-0 z-40 w-screen">
      <header
        className="bg-black/80 backdrop-blur-md"
        style={{
          paddingBottom: 'calc(var(--tg-safe-area-inset-bottom, 0px) - 10px)'
        }}
      >
        <nav className="px-3 pt-1">
          <ul className="flex w-full items-center justify-between">
            <li>{menu}</li>
            <li>
              <Link className="inline-flex p-3" href={routeNames.favourites}>
                {favorites}
              </Link>
            </li>
            <li>{cart}</li>
            <li>
              <Link href={routeNames.catalog} className="inline-flex p-3 text-[24px] text-white">
                <Icon name="common/grid" />
              </Link>
            </li>
            <li>
              <Link href={routeNames.profile} className="inline-flex p-3 text-[24px] text-white">
                <Badge content={0} max={5}>
                  <Icon name="common/user" />
                </Badge>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Box>
  )
}
