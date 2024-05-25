export interface Participant {
    name: string
    id: string
    selected: boolean
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
        participant: {
            id: string
            name: string
        } | null
    }[]
}