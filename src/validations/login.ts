import * as yup from 'yup'

export const validationSchemaLogin = () => {
  return yup.object({
    email: yup.string().required('required').email('invalid'),
    password: yup.string().required('required')
  })
}
