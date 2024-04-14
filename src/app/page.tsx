import { HeaderContent, OutgoinsList } from '@/components/Home/MainContent'
import { OutgoingProps } from '@/types/count'

export default function Home() {
  const outgoings: OutgoingProps[] = [
    {
      id: 1,
      title: 'muzzarella',
      amount: 100,
      date: '11/02/2001',
      paidBy: 'Matias',
      payers: ['pedro', 'carlos', 'Matias']
    },
    {
      id: 2,
      title: 'muzzarella',
      amount: 100,
      date: '11/02/2001',
      paidBy: 'Matias',
      payers: ['pedro', 'carlos']
    },
    {
      id: 3,
      title: 'muzzarella',
      amount: 100,
      date: '11/02/2001',
      paidBy: 'Matias',
      payers: ['pedro', 'carlos']
    }
  ]
  let total = 0
  outgoings.forEach(outgoing => {
    total += outgoing.amount
  })
  const countDetails = {
    title: 'Pizzas',
    description: 'Juntada de finde largo',
    total: total,
    outgoings: outgoings
  }
  return (
    <div className="flex justify-center p-5">
      <div className="flex flex-col w-1/2 gap-2">
        <HeaderContent count={countDetails} />
        <OutgoinsList outgoings={countDetails.outgoings} />
      </div>
    </div>
  )
}
