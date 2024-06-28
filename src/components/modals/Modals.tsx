import React from 'react'
import { AuthRequired, NoRemoveParticipant, RemoveCost, RemoveGroup, ShareGroup } from '.'

export const Modals = () => {
  return (
    <>
      <AuthRequired />
      <NoRemoveParticipant />
      <RemoveCost />
      <RemoveGroup />
      <ShareGroup />
    </>
  )
}
