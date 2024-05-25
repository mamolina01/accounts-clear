import { Category } from '@/components'
import { GroupProps } from '@/types/group'
import Link from 'next/link'
import { BsPlusLg } from 'react-icons/bs'

export const GroupData = async ({ group }: { group: GroupProps }) => {
  const getUsers = () => {
    let users = group.participants.map(participant => participant.name).join(', ')
    return users
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 p-3 bg-primary rounded relative">
      <h4 className="text-3xl col-span-2 text-center">{group.name}</h4>
      <div className="flex flex-col">
        <span className="text-lg">Description</span>
        <span className="text-tertiary">{group.description}</span>
        <span className="text-lg">Participants</span>
        <span className="text-tertiary text-sm">{getUsers()}</span>
      </div>
      <div className="flex flex-col items-end">
        <Category category={group.category} />
        <p className="text-xl">Total</p>
        <p className="text-2xl text-primary">${group.total}</p>
      </div>
      <div className="w-full absolute -bottom-4 ">
        <Link
          href={`/new-cost/${group.id}`}
          className=" bg-sky-600 hover:bg-sky-700 rounded-full h-10 w-10 mx-auto flex justify-center items-center"
        >
          <BsPlusLg className=" text-3xl" />
        </Link>
      </div>
    </div>
  )
}
