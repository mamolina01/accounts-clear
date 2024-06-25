import React from 'react'
import { AuthRequired, NoRemoveParticipant, RemoveGroup, ShareGroup } from '.'

export const Modals = () => {
  return (
    <>
      <ShareGroup />
      <AuthRequired />
      <RemoveGroup />
      <NoRemoveParticipant />
    </>
  )
}
