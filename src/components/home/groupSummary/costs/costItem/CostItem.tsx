'use client'
import { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Menu } from '../menu/Menu'

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
    <div className="bg-secondary w-full p-3 rounded grid grid-cols-[auto_1fr_1fr_auto] gap-y-1 gap-x-2 hover:opacity-80 cursor-pointer">
      <BsChevronDown className={`${showMore && 'rotate-180'} transition-all self-center`} onClick={toggleShowMore} />
      <div>
        <p className="text-xl">{cost.title}</p>
        <p className="text-tertiary text-sm">Paid by: {cost.paidBy.name}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xl text-primary">${cost.amount}</p>
        <p className="text-tertiary text-sm">{cost.date.toLocaleDateString()}</p>
      </div>
      <Menu costId={cost.id} groupId={groupId} />
      {showMore && (
        <div className="text-tertiary col-span-2 col-start-2">
          <p className="text-sm">For {cost.assignedUsers.length} participants:</p>
          <ul className="pl-1">
            {cost.assignedUsers.map((user: AssignedUserProps) => (
              <li
                className="text-sm grid grid-cols-3 justify-between w-full"
                key={`${cost.title}-${user.participant.name}`}
              >
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
