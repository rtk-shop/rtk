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
      height="46px"
      speed={1}
      viewBox="0 0 580 46"
      uniqueKey={uniqueId} // https://github.com/danilowoz/react-content-loader?tab=readme-ov-file#server-side-rendering-ssr---match-snapshot
    >
      <rect x="2%" y="28%" rx="4" ry="4" width="40" height="20" />
      <rect x="26%" y="28%" rx="4" ry="4" width="95" height="20" />
      <rect x="62%" y="28%" rx="4" ry="4" width="75" height="20" />
      <circle cx="94%" cy="23" r="13" />
    </ContentLoader>
  )
}
