import ContentLoader from 'react-content-loader'

export function Skeleton() {
  return (
    <ContentLoader
      style={{
        padding: 4
      }}
      backgroundColor="#eee"
      foregroundColor="#e1e1e1"
      width="100%"
      viewBox="0 0 284 380"
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="70%" />
      <rect x="0" y="74%" rx="6" ry="6" width="69" height="22" />
      <circle cx="90%" cy="76%" r="17" />
      <rect x="0" y="84%" rx="6" ry="6" width="100%" height="27" />
    </ContentLoader>
  )
}
