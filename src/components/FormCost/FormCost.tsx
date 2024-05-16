import { Formik } from 'formik'
import styles from './FormCost.module.scss'
import { validationSchemaNewCost } from '@/validations'

interface FormProps {
  title: string
  description: string
  amount: number
}

export const FormCost = () => {
  const initialValues: FormProps = { title: '', description: '', amount: 0 }

  const handleSubmit = async (values: FormProps) => {
    // if (!session?.user.id) return
    // const participantNames = values.participants.map(participant => {
    //   const { name } = participant
    //   return name
    // })
    // const data = {
    //   name: values.title,
    //   description: values.description,
    //   category: values.category,
    //   participants: participantNames
    // }
    // const { ok } = await createGroup(data)
    // if (ok) {
    //   router.push('/')
    // }
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      validationSchema={validationSchemaNewCost()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
      validateOnMount={false}
    >
      {props => {
        const { values, errors, setFieldValue, handleSubmit, validateField } = props

        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.label}>
                Titulo
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={values.title}
                placeholder="Ingrese un titulo"
                onChange={e => setFieldValue('title', e.target.value)}
                className={`${styles.input} ${errors.title && styles.error}`}
              />
              {errors.title && <p className={styles.errorText}>El titulo es requerido</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="description" className={styles.label}>
                Descripcion
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={values.description}
                placeholder="Ingrese una descripción"
                onChange={e => setFieldValue('description', e.target.value)}
                className={`${styles.input} ${errors.description && styles.error}`}
              />
              {errors.description}
            </div>

            <button type="submit" className={styles.submitButton}>
              Crear balance
            </button>
          </form>
        )
      }}
    </Formik>
  )
}
