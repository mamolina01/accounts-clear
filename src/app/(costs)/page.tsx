import { auth } from '@/auth.config'
import { GroupProps } from '@/types/group'
import { getGroupsByUserId } from '@/actions'
import { CostsList, GroupData, Header, HeaderGroups } from '@/components'

export default async function Home() {
  const session = await auth()

  const groups = await getGroupsByUserId(session?.user.id ?? '')

  if (!groups) {
    return <span>No hay grupos</span>
  }

  return (
    <>
      <HeaderGroups />
      {groups.map((group: GroupProps) => (
        <div key={group.id} className="flex flex-col gap-6">
          <GroupData group={group} />
          <CostsList groupId={group.id} />
        </div>
      ))}
    </>
  )
}
