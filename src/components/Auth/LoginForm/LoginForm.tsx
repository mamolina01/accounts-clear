'use client'

import { authenticate } from '@/actions'
import { Routes } from '@/enums/routes'
import { useGeneralBehaviourStore } from '@/store'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationOutline } from 'react-icons/io5'

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)

  useEffect(() => {
    if (state === 'success') {
      if (redirectUrl) {
        const tempUrl = redirectUrl
        setRedirectUrl('')
        window.location.replace(tempUrl)
      } else {
        window.location.replace(Routes.HOME)
      }
    }
  }, [state])

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input className="px-3 py-2 bg-quarteriary rounded mb-5 outline-none" type="email" name="email" />

      <label htmlFor="email">Contraseña</label>
      <input className="px-3 py-2 bg-quarteriary rounded mb-5 outline-none" type="password" name="password" />

      <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {state === 'CredentialsSignin' && (
          <div className="flex mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales invalidas</p>
          </div>
        )}
      </div>

      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <span className="text-sm text-center">
        Still don't have your account?{' '}
        <Link href={Routes.REGISTER} className="text-blue-500 font-semibold text-base">
          Sign up!
        </Link>
      </span>
    </form>
  )
}

const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      Ingresar
    </button>
  )
}
