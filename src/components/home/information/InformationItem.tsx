import Image, { StaticImageData } from 'next/image'
import styles from './Information.module.scss'

interface Props {
  image: StaticImageData
  title: string
  children: React.ReactNode
  reverseColumn?: boolean
}

export const InformationItem = ({ image, title, children, reverseColumn }: Props) => {
  return (
    <div className={`${styles.itemContainer} ${reverseColumn ? styles.reverseColumn : ''}`}>
      <Image src={image} width={300} height={300} alt="information" className={styles.image} />
      <div className={styles.textContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{children}</p>
      </div>
    </div>
  )
}
