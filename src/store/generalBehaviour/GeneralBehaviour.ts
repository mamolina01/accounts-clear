import { create } from 'zustand'

interface State {
    redirectUrl: string
    setRedirectUrl: (state: string) => void
}

export const useGeneralBehaviourStore = create<State>()(set => ({
    redirectUrl: '',
    setRedirectUrl: state => set({ redirectUrl: state })
}))
