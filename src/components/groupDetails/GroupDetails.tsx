import React from 'react'
import { GroupDetail } from '@/types/groupDetail'
import { GroupInfo } from './groupInfo/GroupInfo'
import { GroupSummary } from './groupSummary/GroupSummary'

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
