import { create } from 'zustand'

interface State {
  shareModal: {
    state: boolean
    id: string
  }
  isAuthModalOpen: boolean
  setShareModal: (shareModal: { state: boolean; id: string }) => void
  setIsAuthModalOpen: (state: boolean) => void

}

export const useModalsStore = create<State>()(set => ({
  shareModal: {
    state: false,
    id: ''
  },
  isAuthModalOpen: false,
  setShareModal: shareModal => {
    set({ shareModal })
  },
  setIsAuthModalOpen: state => set({ isAuthModalOpen: state })

}))
