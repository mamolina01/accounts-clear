'use client'
import { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Menu } from '../menu/Menu'
import styles from './CostItem.module.scss'

interface AssignedUserProps {
  id: string
  participant: {
    name: string
  }
}

interface Props {
  cost: any
  groupId: string
}

// TODO: Check this any
export const CostItem = ({ cost, groupId }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const toggleShowMore = () => setShowMore(!showMore)

  const amountPerPerson = (amountMoney: number, payers: number) => {
    return (amountMoney / payers).toFixed(2)
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return

  return (
    // TODO: Add animation
    <div className={styles.container}>
      <BsChevronDown className={`${styles.arrow} ${showMore && styles.isOpen}`} onClick={toggleShowMore} />
      <div>
        <p className={styles.title}>{cost.title}</p>
        <p className={styles.paidBy}>
          Paid by: <span>{cost.paidBy.name}</span>
        </p>
      </div>
      <div className={styles.rightContainer}>
        <p className={styles.amount}>${cost.amount}</p>
        <p className={styles.date}>{cost.date.toLocaleDateString()}</p>
      </div>
      <Menu costId={cost.id} groupId={groupId} />
      {showMore && (
        <div className={styles.extraContent}>
          <p className={styles.usersQuantity}>For {cost.assignedUsers.length} participants:</p>
          <ul className={styles.usersList}>
            {cost.assignedUsers.map((user: AssignedUserProps) => (
              <li className={styles.user} key={`${cost.title}-${user.participant.name}`}>
                <p>{user.participant.name} </p>
                <p>${amountPerPerson(cost.amount, cost.assignedUsers.length)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
