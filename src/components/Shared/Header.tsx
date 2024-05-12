'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Header = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div className="w-full bg-primary p-3 grid grid-cols-3 items-center fixed">
      <h1 className="text-3xl font-semibold text-primary capitalize text-center col-start-2">CuentasClaras</h1>

      {session?.user ? (
        <div className="flex gap-2 items-center justify-end">
          <span className="uppercase">{session.user.name}</span>
          {session?.user?.image && <img src={session?.user?.image} alt="userimage" className="w-8 h-8 rounded-full" />}
          <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
        </div>
      ) : (
        <div className="flex justify-end gap-2">
          <button onClick={() => signIn()}>registrarse</button>
          <button>loguearse</button>
        </div>
      )}
    </div>
  )
}
