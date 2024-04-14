export interface OutgoingProps {
  id: number
  title: string
  amount: number
  date: string
  paidBy: string
  payers: string[]
}

export interface CountProps {
  title: string
  description: string
  total: number
  outgoings: OutgoingProps[]
}
