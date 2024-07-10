import ContentLoader from 'react-content-loader'
import styles from './styles.module.scss'

export function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <ContentLoader
        backgroundColor="#eeeeee"
        foregroundColor="#e1e1e1"
        width="100%"
        height="86px"
        viewBox="0 0 400 86"
      >
        <rect x="2px" y="0" rx="6" ry="6" width="60" height="28" />
        <rect x="74%" y="0" rx="6" ry="6" width="100" height="28" />
        <rect x="0" y="35" rx="14" ry="14" width="100%" height="50" />
      </ContentLoader>
    </div>
  )
}
