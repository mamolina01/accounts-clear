export interface ParticipantProps {
  name: string
  id: number
}

export interface newBalanceProps {
  title: string
  description: string
  participants: ParticipantProps[]
}
