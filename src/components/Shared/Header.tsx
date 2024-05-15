'use client'
import { signOut, useSession } from 'next-auth/react'
import { logout } from '@/actions'
import { IoLogOutOutline } from 'react-icons/io5'
import Link from 'next/link'

export const Header = () => {
  const { data: session } = useSession()

  return (
    <div className="w-full bg-primary p-3 grid grid-cols-3 items-center fixed">
      <Link href="/" className="text-3xl font-semibold text-primary capitalize text-center col-start-2 cursor-pointer">
        <h1>Costs Management</h1>
      </Link>

      {session?.user && (
        <div className="flex gap-5 items-center justify-end">
          <span className="text-lg capitalize">{session.user.name}</span>
          {session?.user?.image && <img src={session?.user?.image} alt="userimage" className="w-8 h-8 rounded-full" />}
          <button onClick={() => signOut()} className=" bg-sky-700 flex items-center p-1 rounded">
            <IoLogOutOutline size={25} />
          </button>
        </div>
      )}
    </div>
  )
}
