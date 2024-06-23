"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const UserIsAmongParticipants = async (groupId: string) => {
    const session = await auth()
    if (!session?.user) {
        return false
    }

    try {
        const participant = await prisma.participant.findFirst({
            where: {
                groupId: groupId,
                userId: session.user.id
            },
        })

        if (!participant) {
            return false
        }

        return true
    } catch (error) {
        console.log(error)
        return {
            ok: false
        }
    }
}