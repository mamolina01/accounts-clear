import { auth } from '@/auth.config'
import { GroupProps } from '@/types/group'
import { getGroupsByUserId } from '@/actions'
import { GroupData, HeaderGroups } from '@/components'
import { GroupSummary } from '@/components/groups/groupSummary/groupSummary'

export default async function Home() {
  const session = await auth()

  const groups = await getGroupsByUserId(session?.user.id ?? '')

  if (!groups) {
    return <span>No hay grupos</span>
  }

  return (
    <>
      <HeaderGroups />
      <div className="flex flex-col gap-12">
        {groups.map((group: GroupProps) => (
          <div key={group.id} className="flex flex-col gap-5">
            <GroupData group={group} />
            <GroupSummary group={group} />
          </div>
        ))}
      </div>
    </>
  )
}
