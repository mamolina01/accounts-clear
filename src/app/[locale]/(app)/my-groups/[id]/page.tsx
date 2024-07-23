import { getGroupByIdExtended } from '@/actions/groups/get-group-by-id'
import { GroupDetails } from '@/components/groupDetails/GroupDetails'
import { Routes } from '@/enums/routes'
import { redirect } from '@/lib/i18nNavigation'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

const Group = async ({ params }: Props) => {
  const id = params.id ?? ''

  const group = await getGroupByIdExtended(id)

  if (!group) {
    redirect(Routes.GROUPS)
    return
  }

  return <GroupDetails group={group} />
}

export default Group
