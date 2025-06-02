import ContentLoader from 'react-content-loader'

export function StatsSkeleton() {
  return (
    <ul className="flex">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="mr-2.5 last:mr-0">
          <ContentLoader
            backgroundColor="#eeeeee"
            foregroundColor="#e1e1e1"
            width="100%"
            viewBox="0 0 239 104"
          >
            <rect x="0" y="0" rx="14" ry="14" width="100%" height="100%" />
          </ContentLoader>
        </li>
      ))}
    </ul>
  )
}
