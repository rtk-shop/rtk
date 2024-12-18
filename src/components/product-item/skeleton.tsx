import { useId } from 'react'
import ContentLoader from 'react-content-loader'

export function ProductSkeleton() {
  const uniqueId = useId()

  return (
    <ContentLoader
      className="my-2 p-0.5"
      backgroundColor="#eee"
      foregroundColor="#e1e1e1"
      width="100%"
      viewBox="0 0 290 450"
      uniqueKey={uniqueId} // https://github.com/danilowoz/react-content-loader?tab=readme-ov-file#server-side-rendering-ssr---match-snapshot
    >
      <rect x="0" y="0" width="100%" height="80%" />
      <rect x="0" y="84%" rx="6" ry="6" width="80" height="22" />
      <circle cx="91%" cy="86%" r="17" />
      <rect x="0" y="93%" rx="6" ry="6" width="100%" height="27" />
    </ContentLoader>
  )
}
