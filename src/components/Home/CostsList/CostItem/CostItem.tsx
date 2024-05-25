'use client'
import { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

interface UserProps {
  id: string
  participant: {
    name: string
  }
}

export const CostItem = ({ cost }: { cost: any }) => {
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
    <div
      className="bg-secondary w-full p-3 rounded-md grid grid-cols-2 hover:opacity-80 cursor-pointer"
      onClick={toggleShowMore}
    >
      <div>
        <p className="text-xl">{cost.title}</p>
        <p className="text-tertiary text-sm">Paid by: {cost.paidBy.name}</p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="text-end">
          <p className="text-xl">${cost.amount}</p>
          <p className="text-tertiary text-sm">{cost.date.toLocaleDateString()}</p>
        </div>
        <BsChevronDown className={`${showMore && 'rotate-180'} transition-all`} />
      </div>
      {showMore && (
        <div className="text-tertiary col-span-2">
          <p className="text-sm">For {cost.assignedUsers.length} participants:</p>
          <ul className="pl-1">
            {cost.assignedUsers.map((user: UserProps) => (
              <li className="text-sm grid grid-cols-3 justify-between w-full" key={user.id}>
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
