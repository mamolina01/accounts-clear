import Image from 'next/image'
import React from 'react'

export const Category = ({ category }: { category: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm sm:text-xl capitalize">{category}</span>
      <Image
        src={`/icons/${category.toLowerCase()}.png`}
        alt={category}
        width={20}
        height={20}
        className="object-contain h-[10px] w-[10px] sm:h-[20px] sm:w-[20px]"
      />
    </div>
  )
}
