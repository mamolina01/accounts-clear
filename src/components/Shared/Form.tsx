'use client'
import { FormParticipants } from '@/app/create-count/FormParticipants'
import { validationSchemaNewBalance } from '@/validations'
import { Formik } from 'formik'
import { FormEventHandler } from 'react'

interface initialValues {
  title: string
  description: string
  participants: string[]
}

export const Form = () => {
  const initialValues: initialValues = { title: '', description: '', participants: [] }

  return (
    <div className="flex flex-col w-1/2 px-3 py-5 rounded-md bg-secondary">
      <h5 className="text-lg text-center font-semibold">Nuevo balance de gastos</h5>
      <Formik
        initialValues={initialValues}
        validateOnChange
        validationSchema={validationSchemaNewBalance()}
        onSubmit={values => {
          console.log(values)
        }}
        validateOnMount={false}
      >
        {props => {
          const { handleSubmit, values, errors, setFieldValue } = props

          const addParticipant = (newParticipant: string) => {
            if (values.participants.length >= 3) return
            setFieldValue('participants', [...values.participants, newParticipant])
          }

          const onSubmit: FormEventHandler<HTMLFormElement> = e => {
            e.preventDefault()
            if (values.participants.length === 0) {
              setFieldValue('participants', ['Matias (yo)'])
            }
            handleSubmit()
          }

          return (
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-start text-sm">
                  Titulo
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={values.title}
                  placeholder="Ingrese un titulo"
                  onChange={e => setFieldValue('title', e.target.value)}
                  className={`bg-transparent outline-none m-1 border-b-[1px] border-transparent focus:border-tertiary 
                  ${errors.title && '!border-red-500'}`}
                />
                {errors.title && <p className="text-red-500 text-sm mx-1">El titulo es requerido</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-start text-sm">
                  Descripcion
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={values.description}
                  placeholder="Ingrese una descripción"
                  onChange={e => setFieldValue('description', e.target.value)}
                  className={`bg-transparent outline-none m-1 border-b-[1px] border-transparent focus:border-tertiary 
                  ${errors.description && '!border-red-500'}`}
                />
                {errors.description}
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-start text-sm">
                  Participantes {'('}
                  {values.participants.length}/50{')'}
                </label>
                <div className="p-1 text-tertiary flex flex-col gap-2">
                  {values.participants.map(participant => (
                    <input
                      type="text"
                      value={participant}
                      className="bg-transparent outline-none mx-1 border-b-[1px] border-tertiary"
                      onChange={() => {}}
                      key={participant}
                    />
                  ))}
                  <FormParticipants addParticipant={addParticipant} />
                </div>
              </div>
              <button className="bg-blue-500 rounded p-1 w-3/4 mx-auto mt-4">Crear balance</button>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
