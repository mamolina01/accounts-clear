import { Category } from '@/components'
import { GroupProps } from '@/types/group'

export const HeaderContent = async ({ group }: { group: GroupProps }) => {
  const getUsers = () => {
    let users = group.users.map(persona => persona.name).join(', ')

    return users
  }

  return (
    <div className="grid grid-cols-2 p-3 bg-primary rounded-md">
      <h4 className="text-3xl col-span-2 text-center">{group.name}</h4>
      <div className="flex flex-col">
        {/* TODO: Add emoji for each category */}
        <span className="text-lg">Description</span>
        <span className="text-tertiary">{group.description}</span>
        <span className="text-lg">Participants</span>
        <span className="text-tertiary text-sm">{getUsers()}</span>
      </div>
      <div className="flex flex-col items-end">
        <Category category={group.category} />
        <p className="text-xl">Total Gastado</p>
        <p className="text-2xl text-primary">${group.total}</p>
      </div>
    </div>
  )
}
