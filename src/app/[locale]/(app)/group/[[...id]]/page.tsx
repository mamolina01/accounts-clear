import { GroupForm } from '@/components'
import { redirect } from '@/lib/i18nNavigation'
import { auth } from '@/auth.config'
import { GroupInfo } from '@/types/group'
import { Category } from '@prisma/client'
import { Routes } from '@/enums/routes'
import { getGroupById } from '@/actions/groups/get-group-by-id'
import { Metadata } from 'next'

interface Props {
  params: {
    id?: string[]
  }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  const ids = params.id ?? []
  const groupId = params.id ? params.id[0] : ''

  return {
    title: groupId ? 'Edit group' : 'Create group'
  }
}

const Group = async ({ params }: Props) => {
  const groupId = params.id ? params.id[0] : ''
  const { group } = await getGroupById(groupId)
  const session = await auth()

  if (!group && groupId) {
    redirect(Routes.GROUP_FORM)
    return
  }

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

  return <GroupForm group={group ?? initialValues} />
}

export default Group
