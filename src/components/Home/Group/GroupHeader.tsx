import { Category } from '@/components'
import { GroupProps } from '@/types/group'
import Link from 'next/link'
import { BsFillBarChartFill, BsPlusLg } from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'

export const HeaderContent = async ({ group }: { group: GroupProps }) => {
  const getUsers = () => {
    let users = group.participants.map(participant => participant.name).join(', ')
    return users
  }

  return (
    <div className="grid grid-cols-2 p-3 bg-primary rounded-md relative">
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
      <div className="flex justify-between gap-4 w-full col-span-2 mt-4 mb-3 text-lg">
        <button className="flex items-center justify-center gap-2 w-full text-center rounded-lg border border-tertiary py-1">
          <BsFillBarChartFill />
          Balance
        </button>
        <button className="flex items-center justify-center gap-2 w-full text-center rounded-lg border border-tertiary py-1">
          <IoMdMenu />
          Costs
        </button>
      </div>
      <div className="w-full absolute -bottom-4 ">
        <Link
          href={`/new-cost/${group.id}`}
          className=" bg-sky-600 rounded-full h-10 w-10 mx-auto flex justify-center items-center"
        >
          <BsPlusLg className=" text-3xl" />
        </Link>
      </div>
    </div>
  )
}
