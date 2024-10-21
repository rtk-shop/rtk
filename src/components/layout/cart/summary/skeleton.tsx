import ContentLoader from 'react-content-loader'

export function Skeleton() {
  return (
    <div>
      <ContentLoader
        width="100%"
        height={116}
        viewBox="0 0 400 116x"
        backgroundColor="#eeeeee"
        foregroundColor="#e1e1e1"
      >
        <rect x="20" y="10" rx="10" ry="10" width="60" height="26" />
        <rect x="48%" y="10" rx="10" ry="10" width="190" height="26" />
        <rect x="16" y="54" rx="14" ry="14" width="372" height="44" />
      </ContentLoader>
    </div>
  )
}
