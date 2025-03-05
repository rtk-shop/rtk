import { useId } from 'react'
import ContentLoader from 'react-content-loader'

export function OrderItemSkeleton({ expanded = false }: { expanded?: boolean }) {
  const uniqueId = useId()

  if (expanded) {
    return (
      <ContentLoader
        className="rounded-lg bg-slate-100"
        backgroundColor="#e5e7eb"
        foregroundColor="#f3f4f6"
        width="100%"
        speed={1}
        viewBox="0 0 580 490"
        uniqueKey={uniqueId}
      >
        <rect x="2%" y="20" rx="4" ry="4" width="45" height="20" />
        <rect x="26%" y="20" rx="4" ry="4" width="95" height="20" />
        <rect x="62%" y="20" rx="4" ry="4" width="75" height="20" />
        <circle cx="94%" cy="32" r="13" />

        <rect x="2%" y="86" rx="6" ry="6" width="201" height="28" />
        <rect x="2%" y="140" rx="6" ry="6" width="380" height="20" />
        <rect x="2%" y="175" rx="6" ry="6" width="340" height="20" />
        <rect x="2%" y="210" rx="6" ry="6" width="310" height="20" />

        <rect x="2%" y="286" rx="3" ry="3" width="80" height="90" />
        <rect x="20%" y="295" rx="6" ry="6" width="370" height="18" />
        <rect x="20%" y="328" rx="6" ry="6" width="260" height="18" />

        <rect x="2%" y="386" rx="3" ry="3" width="80" height="90" />
        <rect x="20%" y="395" rx="6" ry="6" width="370" height="18" />
        <rect x="20%" y="428" rx="6" ry="6" width="260" height="18" />
      </ContentLoader>
    )
  }

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
