import * as yup from 'yup'

export const validationSchemaLogin = () => {
    return yup.object({
        email: yup.string().required('Email is required').email('Invalid email'),
        password: yup.string().required('Password is required'),
    })
}
