import * as yup from 'yup'

export function validationSchemaNewBalance() {
  return yup.object({
    title: yup.string().required(),
    description: yup.string(),
    category: yup.string().required(),
    participants: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(),
          id: yup.number().required()
        })
      )
      .min(1)
      .required()
  })
}
