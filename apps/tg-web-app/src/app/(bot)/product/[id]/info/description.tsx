import DOMPurify from 'dompurify'
import styles from './markdown-overrides.module.css'

export function Description({ textMarkdown }: { textMarkdown: string }) {
  return (
    <div className={styles.markdown}>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(textMarkdown, { USE_PROFILES: { html: true } })
        }}
      />
    </div>
  )
}
