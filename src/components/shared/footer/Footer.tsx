import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://matiasnmolina.com" target="_blank" className={styles.text}>
        Matias Molina
      </Link>
      <span> | Frontend Developer</span>
    </footer>
  )
}
