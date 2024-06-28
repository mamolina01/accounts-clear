import * as yup from 'yup'

export const validationSchemaRegister = () => {
    return yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').email('Invalid email'),
        password: yup.string().required('Password is required'),
    })
}
