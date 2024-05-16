import * as yup from 'yup'

export function validationSchemaNewCost() {
  return yup.object({
    title: yup.string().required(),
    description: yup.string(),
    amount: yup.number()
  })
}
