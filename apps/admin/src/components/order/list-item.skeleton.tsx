import { useId } from 'react'
import ContentLoader from 'react-content-loader'

export function OrderListItemSkeleton({ len = 10 }: { len?: number }) {
  const uniqueId = useId()

  return (
    <ContentLoader
      className="rounded-lg bg-gray-100"
      backgroundColor="#e5e7eb"
      foregroundColor="#f3f4f6"
      width="100%"
      height={56}
      speed={1}
      viewBox="0 0 100% 56"
      uniqueKey={uniqueId}
    >
      <circle cx="4%" cy="28" r="9" />
      <rect x="18%" y="31%" rx="4" ry="4" width="31%" height="20" />
      <rect x="55%" y="31%" rx="4" ry="4" width="19%" height="20" />
      <rect x="81%" y="31%" rx="4" ry="4" width="17%" height="20" />
    </ContentLoader>
  )
}
