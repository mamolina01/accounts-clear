import styles from './Layout.module.scss'
import { Toaster } from 'react-hot-toast'

const CostsLayout = async ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            marginTop: 50
          }
        }}
      />
      <div className={styles.wrapper}>{children}</div>
    </>
  )
}

export default CostsLayout
