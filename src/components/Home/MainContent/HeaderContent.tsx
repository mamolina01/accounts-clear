import { GroupProps } from '@/types/group'

export const HeaderContent = async ({ group }: { group: GroupProps }) => {
  return (
    <div className="flex justify-between p-3 bg-primary rounded-md items-center">
      <div className="flex flex-col">
        <h4 className="text-3xl">{group.name}</h4>
        <span className="text-tertiary text-sm">{group.description}</span>
        {/* TODO: Add emoji for each category */}
        <span className="text-tertiary text-sm capitalize">{group.category}</span>
      </div>
      <div className="text-end">
        <p className="text-xl">Total Gastado</p>
        <p className="text-2xl text-primary">${group.total}</p>
      </div>
    </div>
  )
}
