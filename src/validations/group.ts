import * as yup from 'yup'

export const validationSchemaNewGroup = () => {
  return yup.object({
    name: yup.string().required('required').max(20, 'max'),
    description: yup.string().max(50, 'max'),
    participants: yup.array().min(1, 'min')
  })
}
