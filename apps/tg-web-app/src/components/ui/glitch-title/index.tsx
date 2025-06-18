import styles from './styles.module.css'

export function GlitchTitle({ title }: { title: number }) {
  return (
    <div title={String(title)} className={styles.box}>
      {title}
    </div>
  )
}
