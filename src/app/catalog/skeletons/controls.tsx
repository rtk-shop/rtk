import { useId } from 'react'
import ContentLoader from 'react-content-loader'

export function ControlsSkeleton() {
  const uniqueId = useId()

  return (
    <div className="py-3">
      <ContentLoader
        backgroundColor="#eee"
        foregroundColor="#e1e1e1"
        width="100%"
        viewBox="0 0 485 50"
        uniqueKey={uniqueId}
      >
        <rect x="0" y="0" rx="10" ry="10" width="50%" height="50" />
        <rect x="51%" y="0" rx="10" ry="10" width="49%" height="50" />
      </ContentLoader>
    </div>
  )
}
