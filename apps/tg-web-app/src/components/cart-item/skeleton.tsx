import ContentLoader from 'react-content-loader'

export function CartItemSkeleton() {
  return (
    <li className="mb-3.5 px-2.5 pt-4">
      <ContentLoader backgroundColor="#eeeeee" foregroundColor="#e1e1e1" width="100%" height={180}>
        <rect x="0" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="200" y="20" rx="8" ry="8" width="170" height="27" />
        <rect x="200" y="72" rx="8" ry="8" width="130" height="20" />
        <rect x="200" y="100" rx="8" ry="8" width="85" height="20" />
      </ContentLoader>
    </li>
  )
}
