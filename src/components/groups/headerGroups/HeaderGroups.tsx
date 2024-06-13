import Link from 'next/link'
import styles from './HeaderGroups.module.scss'
import { MdGroupAdd } from 'react-icons/md'
import { FaPlusCircle } from 'react-icons/fa'

export const HeaderGroups = () => {
  return (
    <div className={styles.container}>
      <Link href="/balance/submit" className={styles.button}>
        <FaPlusCircle className={styles.icon} />
        <span>New group</span>
      </Link>
      <button className={styles.button}>
        <MdGroupAdd className={styles.icon} />
        <span>Join a group</span>
      </button>
    </div>
  )
}
