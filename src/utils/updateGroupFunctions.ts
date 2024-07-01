import { ParticipantGroup } from '@/types/group'

export const updateGroupFunctions = (initialParticipants: ParticipantGroup[], participants: ParticipantGroup[]) => {
  const getModifiedParticipants = (): ParticipantGroup[] => {
    const filteredParticipants = participants.reduce(
      (accumulator: ParticipantGroup[], participant1: ParticipantGroup) => {
        const tempParticipant = initialParticipants.find(
          (participant2: ParticipantGroup) =>
            participant1.id === participant2.id && participant1.name !== participant2.name
        )

        if (tempParticipant) {
          accumulator.push(participant1)
        }

        return accumulator
      },
      []
    )

    return filteredParticipants
  }

  const getRemovedParticipants = (): ParticipantGroup[] => {
    const combinedArray = participants.concat(initialParticipants)

    const idCount: Record<string, number> = combinedArray.reduce((acc, obj) => {
      acc[obj.id] = (acc[obj.id] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const removedParticipants = combinedArray.filter(
      participant =>
        idCount[participant.id] === 1 &&
        participant.assignedCosts.length === 0 &&
        !participants.some(p => p.id === participant.id)
    )

    return removedParticipants
  }

  const getNewParticipants = (): ParticipantGroup[] => {
    const newParticipants: ParticipantGroup[] = []

    participants.map((participant: ParticipantGroup) => {
      const tempParticipant = initialParticipants.find(participant2 => participant2.id === participant.id)
      if (!tempParticipant) {
        newParticipants.push(participant)
      }
    })

    return newParticipants
  }

  return {
    getModifiedParticipants,
    getRemovedParticipants,
    getNewParticipants
  }
}
