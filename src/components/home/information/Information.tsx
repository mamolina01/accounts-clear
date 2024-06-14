import image1 from '@/public/images/money.jpg'
import image2 from '@/public/images/friends2.jpg'
import styles from './Information.module.scss'
import { InformationItem } from './InformationItem'

export const Information = () => {
  return (
    <div className={styles.container}>
      <InformationItem image={image1} title="Keep your accounts up to date.">
        Keep track of expenses and balances shared with roommates, travel companions, groups, friends, and family.
      </InformationItem>
      <InformationItem image={image2} title="Good accounting makes good friends." reverseColumn>
        With <span className="text-primary font-semibold">Clear Accounts</span>, split expenses with any group: trips,
        roommates, friends, and family.
      </InformationItem>
    </div>
  )
}
