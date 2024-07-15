import ContentLoader from 'react-content-loader'

export function Skeleton() {
  return (
    <div>
      <ContentLoader
        backgroundColor="#f3f3f3"
        foregroundColor="#e1e1e1"
        width="100%"
        height="86px"
        viewBox="0 0 400 86"
      >
        <rect x="5" y="3" rx="6" ry="6" width="60" height="26" />
        <rect x="73%" y="3" rx="6" ry="6" width="100" height="26" />
        <rect x="5" y="40" rx="14" ry="14" width="97%" height="40" />
      </ContentLoader>
    </div>
  )
}
