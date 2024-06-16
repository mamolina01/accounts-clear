import { getGroupByIdExtended } from '@/actions'
import { GroupDetails } from '@/components'
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
    return <></>
  }

  return <GroupDetails group={group} />
}

export default Group