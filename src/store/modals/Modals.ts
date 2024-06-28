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
  isRemoveCostModalOpen: {
    state: boolean
    id: string
  },
  isNoRemoveParticipantModalOpen: boolean
  setShareModal: (shareModal: { state: boolean; id: string }) => void
  setIsAuthModalOpen: (state: boolean) => void
  setIsRemoveGroupModalOpen: (isRemoveGroupModalOpen: { state: boolean; id: string }) => void
  setNoRemoveParticipantModalOpen: (state: boolean) => void,
  setIsRemoveCostModalOpen: (isRemoveCostModalOpen: { state: boolean; id: string }) => void

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
  isRemoveCostModalOpen: {
    state: false,
    id: ''
  },
  isNoRemoveParticipantModalOpen: false,
  setShareModal: shareModal => {
    set({ shareModal })
  },
  setIsAuthModalOpen: state => set({ isAuthModalOpen: state }),
  setIsRemoveGroupModalOpen: isRemoveGroupModalOpen => set({ isRemoveGroupModalOpen }),
  setNoRemoveParticipantModalOpen: state => set({ isNoRemoveParticipantModalOpen: state }),
  setIsRemoveCostModalOpen: isRemoveCostModalOpen => set({ isRemoveCostModalOpen }),

}))
