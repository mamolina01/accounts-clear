import image1 from '@/public/images/money.jpg'
import image2 from '@/public/images/friends2.jpg'
import styles from './Information.module.scss'
import { InformationItem } from './InformationItem'
import { useTranslations } from 'next-intl'

export const Information = () => {
  const t = useTranslations('home.information')
  return (
    <div className={styles.container}>
      <InformationItem image={image1} title={t('item1.title')}>
        {t('item1.description')}
      </InformationItem>
      <InformationItem image={image2} title={t('item2.title')} reverseColumn>
        {t('item2.description.part1')}
        <span className={styles.highlightSection}>{t('item2.description.part2')}</span>
        {t('item2.description.part3')}
      </InformationItem>
    </div>
  )
}
