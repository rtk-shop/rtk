import ContentLoader from 'react-content-loader'

export function StatsSkeleton() {
  return (
    <ul className="flex w-full">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="mr-1 grow last:mr-0">
          <ContentLoader
            backgroundColor="#eeeeee"
            foregroundColor="#e1e1e1"
            width="100%"
            viewBox="0 0 357 104"
          >
            <rect x="0" y="0" rx="24" ry="24" width="100%" height="100%" />
          </ContentLoader>
        </li>
      ))}
    </ul>
  )
}
