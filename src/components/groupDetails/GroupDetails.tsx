import React from 'react'
import { GroupInfo, GroupSummary } from '.'
import { GroupDetail } from '@/types/groupDetail'

interface Props {
  group: GroupDetail
}

export const GroupDetails = ({ group }: Props) => {
  return (
    <>
      <GroupInfo group={group} />
      <GroupSummary group={group} />
    </>
  )
}
