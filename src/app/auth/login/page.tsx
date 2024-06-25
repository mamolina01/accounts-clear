import { LoginForm } from '@/components'

const LoginPage = () => {
  return (
    <div className="flex flex-col animate__animated animate__fadeIn">
      <h1 className="text-4xl mb-5">Ingresar</h1>

      <LoginForm />
    </div>
  )
}

export default LoginPage
