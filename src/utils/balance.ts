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

export const getBalance = (costs: CostProps[], participants: Participant[]) => {
    const totalPaidByParticipant = getTotalPaidByParticipant(costs, participants)
    const totalAssignedByParticipant = getTotalAssignedByParticipant(costs, participants)

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

interface transactionProps {
    to: string
    from: string
    amount: number
}

export const getRefunds = (costs: CostProps[], participants: Participant[]) => {
    const balances = getBalance(costs, participants)
    let debtors = balances.filter(balance => balance.total < 0);
    let creditors = balances.filter(balance => balance.total > 0);
    let transactions: transactionProps[] = [];

    debtors.forEach(debtor => {
        let debt = -debtor.total;
        creditors.forEach(creditor => {
            if (debt > 0) {
                let credit = creditor.total;
                let amountToPay = Math.min(debt, credit);
                transactions.push({
                    from: debtor.name,
                    to: creditor.name,
                    amount: amountToPay
                });
                debtor.total += amountToPay;
                creditor.total -= amountToPay;
                debt -= amountToPay;
            }
        });
    });

    const refunds = balances.map(balance => {
        const participantsToPay = transactions.filter(transaction => transaction.from === balance.name || transaction.to === balance.name)
            .map(transaction => {
                if (transaction.from === balance.name) {
                    return {
                        to: transaction.to,
                        amount: transaction.amount
                    };
                } else {
                    return {
                        from: transaction.from,
                        amount: transaction.amount
                    };
                }
            });

        return {
            ...balance,
            participantsToPay
        }
    });

    return refunds;
}