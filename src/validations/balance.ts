import * as yup from 'yup'

export const validationSchemaNewBalance = () => {
  return yup.object({
    name: yup.string().required('Name is required').max(20, 'Max 20 characters.'),
    description: yup.string().max(50, 'Max 50 characters.'),
    category: yup.string().required('Category is required'),
    participants: yup.array().min(1, 'At least one participant is required')
  })
}
