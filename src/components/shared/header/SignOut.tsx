'use client'
import { IoLogOutOutline } from 'react-icons/io5'
import { signOut } from 'next-auth/react'
import styles from './Header.module.scss'

export const SignOut = () => {
  return (
    <button className={styles.signOut} onClick={() => signOut()}>
      <IoLogOutOutline size={30} />
    </button>
  )
}
