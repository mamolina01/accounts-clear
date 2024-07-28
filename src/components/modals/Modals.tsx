import React from 'react'
import { AuthRequired, JoinGroup, NoRemoveParticipant, RemoveCost, RemoveGroup, ShareGroup } from '.'

export const Modals = () => {
  return (
    <>
      <AuthRequired />
      <NoRemoveParticipant />
      <RemoveCost />
      <RemoveGroup />
      <ShareGroup />
      <JoinGroup />
    </>
  )
}
