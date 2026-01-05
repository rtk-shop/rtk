import { Box } from '@/components/ui/box'
import DOMPurify from 'isomorphic-dompurify'
import styles from './markdown-overrides.module.css'

export function Description({ textMarkdown }: { textMarkdown: string }) {
  return (
    <Box className={styles.markdown}>
      <Box
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(textMarkdown, { USE_PROFILES: { html: true } })
        }}
      />
    </Box>
  )
}
