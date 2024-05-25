import { CostProps, Participant } from "@/types/cost"

export const getTotalPaidByParticipant = (costs: CostProps[], participants: Participant[]) => {
    const totalByParticipant = participants.map(participant => {
        let total = 0
        costs.map(cost => {
            if (cost.paidBy.id === participant.id) {
                total += cost.amount
            }
        })

        total = Number(total.toFixed(2))
        return {
            ...participant,
            total
        }
    })

    return totalByParticipant
}

export const getTotalAssignedByParticipant = (costs: CostProps[], participants: Participant[]) => {
    const mustPaid = participants.map(participant => {
        let total = 0
        costs.map(cost => {
            cost.assignedUsers.map(user => {
                if (user.participant?.id === participant.id) {
                    total += (cost.amount / cost.assignedUsers.length)
                }
            })
        })

        total = Number(total.toFixed(2))
        return {
            ...participant,
            total
        }
    })

    return mustPaid
}

interface Props {
    id: string
    name: string
    total: number
}

export const getBalance = (costs: CostProps[], participants: Participant[]) => {
    const totalPaidByParticipant = getTotalPaidByParticipant(costs, participants)
    const totalAssignedByParticipant = getTotalAssignedByParticipant(costs, participants)
    console.log({ totalAssignedByParticipant })

    return totalAssignedByParticipant.map(totalAssigned => {
        let total = 0
        totalPaidByParticipant.map(totalPaid => {
            if (totalAssigned.id === totalPaid.id) {
                if (totalAssigned.total > totalPaid.total) {
                    total = -(totalAssigned.total - totalPaid.total)
                } else if (totalAssigned.total < totalPaid.total) {
                    total = totalPaid.total - totalAssigned.total
                }
            }
        })

        return {
            id: totalAssigned.id,
            name: totalAssigned.name,
            total
        }
    })
}

export const getRefunds = (balances: Props[]) => {
    const tempBalances = balances

    const refunds = balances.map((balance: Props) => {
        const participantsToPay: Props[] = []
        if (balance.total < 0) {
            tempBalances.map((tempBalance: Props) => {
                if (tempBalance.total > 0) {
                    console.log(`${tempBalance.name} - ${tempBalance.total}`)
                    if (tempBalance.total - balance.total > 0) {
                        participantsToPay.push({
                            id: tempBalance.id,
                            name: tempBalance.name,
                            total: -balance.total
                        })
                        tempBalance.total += balance.total
                        // console.log(tempBalance.total += balance.total)
                    } else if (tempBalance.total - balance.total <= 0) {
                        console.log(`${tempBalance.name} - ${tempBalance.total}`)
                    }
                    // console.log(`${tempBalance.name} - ${tempBalance.total}`)
                }
            })
        }
        return {
            ...balance,
            participantsToPay
        }
    })

    console.log(refunds)
}