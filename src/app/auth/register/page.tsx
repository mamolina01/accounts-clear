import { RegisterForm } from '@/components'

const NewAccountPage = () => {
  return (
    <div className="flex flex-col animate__animated animate__fadeIn">
      <h1 className="text-4xl mb-5">Nueva cuenta</h1>

      <RegisterForm />
    </div>
  )
}

export default NewAccountPage
