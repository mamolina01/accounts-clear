import Image from 'next/image'
import styles from './Category.module.scss'
import { useTranslations } from 'next-intl'

export const Category = ({ category }: { category: string }) => {
  const t = useTranslations('groupDetails.groupInfo.categories')
  return (
    <div className={styles.container}>
      <span className={styles.text}>{t(category)}</span>
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
