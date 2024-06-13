import styles from './HeroSection.module.scss'

export const HeroSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div>
          <h4 className={styles.title}>Welcome to</h4>
          <h4 className={styles.title}>Clear Accounts</h4>
          <p className={styles.description}>Split your expenses with your friends!</p>
          <div className={styles.buttons}>
            <button className={styles.buttonLogin}>Login</button>
            <button className={styles.buttonRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}
