export interface Participant {
    name: string
    id: string
}

export interface CostProps {
    id: string
    title: string
    date: Date
    amount: number
    paidBy: {
        id: string
        name: string
    }
    assignedUsers: {
        participant: Participant | null
    }[]
}