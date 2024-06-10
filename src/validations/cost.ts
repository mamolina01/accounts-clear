import * as yup from 'yup'

export function validationSchemaNewCost() {
  return yup.object({
    title: yup.string().required('Title is required'),
    amount: yup.string().required('Amount is required'),
    paidBy: yup.string().required('Paid By is required'),
    assignedUsers: yup.array().min(1, 'At least one participant is required')
  })
}
