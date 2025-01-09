import { useId } from 'react'
import ContentLoader from 'react-content-loader'

export function OrderItemSkeleton() {
  const uniqueId = useId()

  return (
    <ContentLoader
      className="rounded-lg bg-slate-100"
      backgroundColor="#e5e7eb"
      foregroundColor="#f3f4f6"
      width="100%"
      hanging={48}
      speed={1}
      viewBox="0 0 380 46"
      uniqueKey={uniqueId} // https://github.com/danilowoz/react-content-loader?tab=readme-ov-file#server-side-rendering-ssr---match-snapshot
    >
      <rect x="2%" y="28%" rx="4" ry="4" width="40" height="20" />
      <rect x="25%" y="28%" rx="4" ry="4" width="91" height="20" />
      <rect x="61%" y="28%" rx="4" ry="4" width="70" height="20" />
      <circle cx="94%" cy="23" r="13" />
    </ContentLoader>
  )
}
