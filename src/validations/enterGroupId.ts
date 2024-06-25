import * as yup from 'yup'

export const validationSchemaEnterGroupId = () => {
    return yup.object({
        id: yup.string().required('ID is required'),
    })
}
