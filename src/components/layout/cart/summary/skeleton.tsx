import ContentLoader from 'react-content-loader'

export function Skeleton() {
  return (
    <ContentLoader
      width="100%"
      height="116px"
      viewBox="0 0 430 116"
      backgroundColor="#eeeeee"
      foregroundColor="#e1e1e1"
    >
      <rect x="20" y="10" rx="10" ry="10" width="60" height="26" />
      <rect x="52%" y="10" rx="10" ry="10" width="190" height="26" />
      <rect x="16" y="54" rx="14" ry="14" width="93%" height="44" />
    </ContentLoader>
  )
}
