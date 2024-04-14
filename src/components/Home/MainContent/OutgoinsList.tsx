import { OutgoingProps } from '@/types/count'
import { OutgoingItem } from './OutgoingItem'

export const OutgoinsList = ({ outgoings }: { outgoings: OutgoingProps[] }) => {
  return (
    <div className="flex flex-col gap-1 ">
      {outgoings.map(outgoing => (
        <OutgoingItem key={outgoing.id} outgoing={outgoing} />
      ))}
    </div>
  )
}
