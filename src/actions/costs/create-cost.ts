"use server"

import prisma from "@/lib/prisma"
import { CostProps } from "@/types/cost"

export const createCost = async (data: CostProps, groupId: string) => {
    try {
        const { id: costId } = await prisma.cost.create({
            data: {
                title: data.title,
                amount: Number(data.amount),
                participantId: data.paidBy.id,
                date: new Date(),
                groupId: groupId
            }
        })

        await prisma.costAssignment.create({
            data: {
                costId: costId,
                participantId: data.paidBy.id
            }
        })

        await prisma.group.update({
            where: {
                id: groupId
            },
            data: {
                total: Number(data.amount)
            }
        })

        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }
}