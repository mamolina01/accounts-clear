'use client'
import { OutgoingProps } from '@/types/count'
import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

export const OutgoingItem = ({ outgoing }: { outgoing: OutgoingProps }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore(!showMore)

  const amountPerPerson = (amountMoney: number, payers: number) => {
    return (amountMoney / payers).toFixed(2)
  }

  return (
    <>
      <div
        className="bg-secondary w-full p-3 rounded-md grid grid-cols-2 hover:opacity-80 cursor-pointer"
        onClick={toggleShowMore}
      >
        <div>
          <p className="capitalize text-xl">{outgoing.title}</p>
          <p className="text-tertiary text-sm">Pagado por: {outgoing.paidBy}</p>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="text-end">
            <p className="text-xl">${outgoing.amount}</p>
            <p className="text-tertiary text-sm">{outgoing.date}</p>
          </div>
          <BsChevronDown className={`${showMore && 'rotate-180'} transition-all`} />
        </div>
        {showMore && (
          <div className="text-tertiary">
            <p className="text-sm">Para {outgoing.payers.length} participantes:</p>
            <ul className="pl-1">
              {outgoing.payers.map(payer => (
                <li className="text-sm flex justify-between">
                  <p>{payer}</p>
                  <p>${amountPerPerson(outgoing.amount, outgoing.payers.length)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
