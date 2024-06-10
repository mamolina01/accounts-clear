import * as yup from 'yup'

export function validationSchemaNewBalance() {
  return yup.object({
    name: yup.string().required(),
    description: yup.string(),
    category: yup.string().required(),
    participants: yup.array()
  })
}
