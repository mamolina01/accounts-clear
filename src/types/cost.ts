export interface Participant {
    name: string
    id: string
    selected: boolean
}

export interface CostProps {
    title: string
    amount: string
    paidBy: {
        id: string
        name: string
    }
    participants: Participant[]
}