import Image from 'next/image'
import styles from './Category.module.scss'

export const Category = ({ category }: { category: string }) => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>{category}</span>
      <Image
        src={`/icons/${category.toLowerCase()}.png`}
        alt={category}
        width={20}
        height={20}
        className={styles.icon}
      />
    </div>
  )
}
