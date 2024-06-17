import { create } from 'zustand'

interface State {
  shareModal: {
    state: boolean
    id: string
  }
  setShareModal: (shareModal: { state: boolean; id: string }) => void
}

export const useModalsStore = create<State>()(set => ({
  shareModal: {
    state: false,
    id: ''
  },
  setShareModal: shareModal => {
    set({ shareModal })
  }
}))
