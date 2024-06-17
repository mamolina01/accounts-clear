import styles from './FormContainer.module.scss'
interface Props {
  title: string
  children: React.ReactNode
}

export const FormContainer = ({ title, children }: Props) => {
  return (
    // TODO: Add animates
    <div className={styles.container}>
      <h5 className={styles.title}>{title}</h5>
      {children}
    </div>
  )
}
