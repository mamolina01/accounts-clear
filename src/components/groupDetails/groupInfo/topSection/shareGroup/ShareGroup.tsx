import { MdOutlineContentCopy } from 'react-icons/md'
import styles from './ShareGroup.module.scss'

export const ShareGroup = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h5 className={styles.title}>Share Group</h5>

        <div className={styles.groupContainer}>
          <p className={styles.groupLink}>Group Link</p>
          <div className={styles.linkContainer}>
            <p className={styles.textLink}>{process.env.SITE_URL}/ASLKDJASDA</p>
            <MdOutlineContentCopy size={20} />
          </div>
        </div>
        <p className={styles.text}>Anyone with the link can join this group</p>
      </div>
    </div>
  )
}
