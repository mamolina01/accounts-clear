import { CostProps, Participant } from "@/types/cost"

export const getTotalByParticipant = (costs: CostProps[], participants: Participant[]) => {
    const totalByParticipant = participants.map(participant => {
        let total = 0
        costs.map(cost => {
            if (cost.paidBy.id === participant.id) {
                total += cost.amount
            }
        })
        return {
            ...participant,
            total
        }
    })

    return totalByParticipant
}