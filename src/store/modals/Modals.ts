import { create } from 'zustand'

interface State {
  shareModal: {
    state: boolean
    id: string
  }
  isAuthModalOpen: boolean
  isRemoveGroupModalOpen: {
    state: boolean
    id: string
  },
  isNoRemoveParticipantModalOpen: boolean
  setShareModal: (shareModal: { state: boolean; id: string }) => void
  setIsAuthModalOpen: (state: boolean) => void
  setIsRemoveGroupModalOpen: (removeGroupModal: { state: boolean; id: string }) => void
  setNoRemoveParticipantModalOpen: (state: boolean) => void
}

export const useModalsStore = create<State>()(set => ({
  shareModal: {
    state: false,
    id: ''
  },
  isAuthModalOpen: false,
  isRemoveGroupModalOpen: {
    state: false,
    id: ''
  },
  isNoRemoveParticipantModalOpen: false,
  setShareModal: shareModal => {
    set({ shareModal })
  },
  setIsAuthModalOpen: state => set({ isAuthModalOpen: state }),
  setIsRemoveGroupModalOpen: removeGroupModal => set({ isRemoveGroupModalOpen: removeGroupModal }),
  setNoRemoveParticipantModalOpen: state => set({ isNoRemoveParticipantModalOpen: state }),
}))
