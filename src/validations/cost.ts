import * as yup from 'yup'

export const validationSchemaNewCost = () => {
  return yup.object({
    title: yup.string().required('required').max(20, 'max'),
    amount: yup.string().required('required'),
    paidBy: yup.string().required('required'),
    assignedUsers: yup.array().min(1, 'min')
  })
}
