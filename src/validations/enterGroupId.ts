import * as yup from 'yup'

export function validationSchemaEnterGroupId() {
    return yup.object({
        id: yup.string().required('ID is required'),
    })
}
