import { useId } from 'react'
import ContentLoader from 'react-content-loader'

export function Skeleton() {
  const uniqueId = useId()

  return (
    <ContentLoader
      style={{
        padding: 4
      }}
      backgroundColor="#eee"
      foregroundColor="#e1e1e1"
      width="100%"
      viewBox="0 0 290 410"
      uniqueKey={uniqueId} // https://github.com/danilowoz/react-content-loader?tab=readme-ov-file#server-side-rendering-ssr---match-snapshot
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="80%" />
      <rect x="0" y="84%" rx="6" ry="6" width="74" height="22" />
      <circle cx="91%" cy="86%" r="17" />
      <rect x="0" y="93%" rx="6" ry="6" width="100%" height="27" />
    </ContentLoader>
  )
}
