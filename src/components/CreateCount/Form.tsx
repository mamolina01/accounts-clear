'use client'
import { FormParticipants } from '@/components/CreateCount/FormParticipants'
import { Participant } from '@/components/CreateCount/Participant'
import { generateID } from '@/helpers'
import { ParticipantProps, newBalanceProps } from '@/types/newBalance'
import { validationSchemaNewBalance } from '@/validations'
import { Formik } from 'formik'
import { FormEventHandler } from 'react'

export const Form = () => {
  const initialValues: newBalanceProps = { title: '', description: '', participants: [] }

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
          const { values, errors, setFieldValue, handleSubmit, validateField } = props

          const addParticipant = (newParticipant: string) => {
            if (values.participants.length >= 50) return
            setFieldValue('participants', [...values.participants, { name: newParticipant, id: generateID() }])
          }

          const editParticipant = (newParticipant: ParticipantProps) => {
            const tempParticipants = values.participants.map(participant =>
              participant.id === newParticipant.id ? newParticipant : participant
            )
            setFieldValue('participants', tempParticipants)
          }

          const removeParticipant = (participant: ParticipantProps) => {
            const tempParticipants = values.participants.filter(
              tempParticipant => tempParticipant.id !== participant.id
            )
            setFieldValue('participants', tempParticipants)
          }

          const onSubmit: FormEventHandler<HTMLFormElement> = e => {
            e.preventDefault()
            if (values.participants.length === 0) {
              setFieldValue('participants', [...values.participants, { name: 'Matias (yo)', id: generateID() }])
              validateField('participants')
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
                <p className="text-start text-sm">
                  Participantes {'('}
                  {values.participants.length}/50{')'}
                </p>
                <div className="text-tertiary flex flex-col gap-2 max-h-40 overflow-scroll px-3 mt-2 border-x-[2px] border-tertiary">
                  {values.participants.map(participant => (
                    <Participant
                      participant={participant}
                      editParticipant={editParticipant}
                      removeParticipant={removeParticipant}
                      key={participant.id}
                    />
                  ))}
                </div>
                <FormParticipants addParticipant={addParticipant} />
              </div>
              <button type="submit" className="bg-blue-500 rounded-sm p-1 w-3/4 mx-auto mt-4">
                Crear balance
              </button>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
