import * as yup from 'yup'

export const validationSchemaRegister = () => {
  return yup.object({
    name: yup.string().required('required'),
    email: yup.string().required('required').email('invalid'),
    password: yup.string().required('required')
  })
}
