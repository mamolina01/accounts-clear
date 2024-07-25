import { getGroupByIdExtended } from '@/actions/groups/get-group-by-id'
import { GroupDetails } from '@/components/groupDetails/GroupDetails'
import { Routes } from '@/enums/routes'
import { redirect } from '@/lib/i18nNavigation'
import { Metadata } from 'next'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = params.id ?? ''

  const group = await getGroupByIdExtended(id)

  return {
    title: group?.name,
    description: `All details about ${group?.name} group.`
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
