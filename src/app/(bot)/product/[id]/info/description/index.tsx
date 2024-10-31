import styles from './styles.module.scss'

interface DescriptionProps {
  gender: string
  category: string
  description: string
  dimensions: string
  color: string
}

// TODO: build it with loop
export function Description({
  gender,
  description,
  dimensions,
  color,
  category
}: DescriptionProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Описание</h2>
      <p className={styles.descText}>{description}</p>
      <div className={styles.inner}>
        {dimensions && (
          <div className={styles.detail}>
            <span className={styles.detailTitle}>Размер</span>
            <span className={styles.info}>
              <span className={styles.divider}>:</span>
              {dimensions} см.
            </span>
          </div>
        )}
        {color && (
          <div className={styles.detail}>
            <span className={styles.detailTitle}>Цвет</span>
            <span className={styles.info}>
              <span className={styles.divider}>:</span>
              {color}
            </span>
          </div>
        )}
        <div className={styles.detail}>
          <span className={styles.detailTitle}>Тип</span>
          <span className={styles.info}>
            <span className={styles.divider}>:</span>
            {gender}
          </span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailTitle}>Категория</span>
          <span className={styles.info}>
            <span className={styles.divider}>:</span>
            {category}
          </span>
        </div>
      </div>
    </div>
  )
}
