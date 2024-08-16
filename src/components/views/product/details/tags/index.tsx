import { getColorByTagName } from '@/lib/helpers'
import styles from './styles.module.scss'

interface TagsProps {
  tags: string[]
}

export function Tags({ tags }: TagsProps) {
  return (
    <ul className={styles.container}>
      {tags.map((tag: string, index: number) => (
        <li
          key={index}
          className={styles.tag}
          style={{
            backgroundColor: getColorByTagName(tag)
          }}
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
