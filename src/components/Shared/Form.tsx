'use client'
import { useForm } from '@/hooks'
import { FormInputsProps } from '@/types/FormInputs'
import { FormEventHandler } from 'react'

export const Form = () => {
  let values = {} // Objeto para almacenar los nuevos valores iniciales

  const title = 'Nuevo balance de gastos'
  const formValues: FormInputsProps[] = [
    {
      label: 'Titulo',
      placeholder: 'Ingrese un titulo',
      name: 'title',
      value: '',
      type: 'text'
    },
    {
      label: 'Descripcion',
      placeholder: 'Ingrese una descripción',
      name: 'description',
      value: '',
      type: 'text'
    }
  ]

  formValues.forEach(value => {
    values = {
      ...values,
      [value.name]: value.value
    }
  })

  const { onInputChange, formState, isFormValid } = useForm(values)

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (isFormValid()) {
      console.log('Es valido')
    }
  }

  if (!formState) return

  return (
    <div className="flex flex-col w-1/2 px-3 py-5 rounded-md bg-secondary">
      <h5 className="text-lg text-center font-semibold">{title}</h5>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {formValues.map(formValue => (
          <div className="flex flex-col" key={formValue.name}>
            <label htmlFor={formValue.name} className="text-start text-sm">
              {formValue.label}
            </label>
            <input
              id={formValue.name}
              name={formValue.name}
              type={formValue.type}
              value={formState[formValue.name]}
              placeholder={formValue.placeholder}
              onChange={e => onInputChange(e)}
              className="bg-transparent outline-none p-1"
            />
          </div>
        ))}
        <button className="bg-blue-500 rounded p-1 w-3/4 mx-auto mt-4">Crear balance</button>
      </form>
    </div>
  )
}
