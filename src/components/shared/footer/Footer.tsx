import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>Matias Molina</span>
      <span> | Frontend Developer</span>
    </footer>
  )
}
