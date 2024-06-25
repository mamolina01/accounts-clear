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
  }
  setShareModal: (shareModal: { state: boolean; id: string }) => void
  setIsAuthModalOpen: (state: boolean) => void
  setIsRemoveGroupModalOpen: (removeGroupModal: { state: boolean; id: string }) => void
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
  setShareModal: shareModal => {
    set({ shareModal })
  },
  setIsAuthModalOpen: state => set({ isAuthModalOpen: state }),
  setIsRemoveGroupModalOpen: removeGroupModal => set({ isRemoveGroupModalOpen: removeGroupModal })
}))
