import React from 'react'

export const Header = () => {
  return (
    <div className="w-full bg-secondary p-3 grid grid-cols-3 items-center">
      <h1 className="text-3xl font-semibold text-primary capitalize text-center col-start-2">CuentasClaras</h1>

      <div className="flex gap-2 items-center justify-end">
        <span className="uppercase">user</span>
        <div className="w-8 h-8 rounded-full bg-blue-500"></div>
      </div>
    </div>
  )
}
