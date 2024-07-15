import clsx from 'clsx'
import styles from './styles.module.scss'

type availableSizes = 'S' | 'M' | 'L' | 'XL' | '2XL'

interface SizeGuideProps {
  current: availableSizes
  available: Array<availableSizes>
}

export function SizeGuide({ current, available }: SizeGuideProps) {
  const sizes = ['S', 'M', 'L', 'XL', '2XL']

  const normalized = available.reduce((acc, size) => ({ ...acc, [size]: undefined }), {})

  return (
    <div>
      <p className={styles.title}>Выбрать размер</p>
      <ul className={styles.list}>
        {sizes.map((size) => (
          <li
            key={size}
            className={clsx({
              [styles.sizeItem]: true,
              [styles.active]: size === current,
              [styles.inactive]: !Object.prototype.hasOwnProperty.call(normalized, size)
            })}
          >
            <span>{size}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
