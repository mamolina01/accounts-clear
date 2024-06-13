import Image from 'next/image'
import exchangeOff from '/public/exchangeOff.svg'

export const EmptyRefunds = () => {
  return (
    <div className="flex flex-col items-center gap-2 my-2">
      <Image src={exchangeOff} alt="exchangeOff" className="h-10 w-10" />
      <p className="text-tertiary">No necessary refunds</p>
    </div>
  )
}
