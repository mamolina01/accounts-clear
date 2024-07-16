import { GroupForm, FormContainer } from '@/components'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { GroupInfo } from '@/types/group'
import { Category } from '@prisma/client'
import { Routes } from '@/enums/routes'
import { getGroupById } from '@/actions/groups/get-group-by-id'

interface Props {
  params: {
    id?: string[]
  }
}

const Group = async ({ params }: Props) => {
  const groupId = params.id ? params.id[0] : ''
  const { group } = await getGroupById(groupId)
  const session = await auth()

  if (!group && groupId) {
    redirect(Routes.GROUP_FORM)
  }
  const title = group ? 'Edit group' : 'New group'

  const initialValues: GroupInfo = {
    name: '',
    description: '',
    category: Category.Travel,
    participants: []
  }

  if (session && !group) {
    initialValues.participants.push({
      name: session?.user?.name,
      id: session?.user?.id,
      assignedCosts: []
    })
  }

  return (
    <FormContainer title={title}>
      <GroupForm group={group ?? initialValues} />
    </FormContainer>
  )
}

export default Group
