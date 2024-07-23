'use client'
import { Category } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useRouter } from '@/lib/i18nNavigation'
import { FormEventHandler, useState } from 'react'
import styles from './GroupForm.module.scss'
import { GroupInfo } from '@/types/group'
import toast from 'react-hot-toast'
import { Participants } from './participants/Participants'
import { Routes } from '@/enums/routes'
import { createGroup } from '@/actions/groups/create-group'
import { updateGroup } from '@/actions/groups/update-group'
import { FormContainer } from '..'
import { useTranslations } from 'next-intl'
import { validationSchemaNewGroup } from '@/validations'

interface Props {
  group: GroupInfo
}

export const GroupForm = ({ group }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('groupForm')

  const handleSubmit = async (values: GroupInfo) => {
    const data = {
      name: values.name,
      description: values.description,
      category: values.category,
      participants: values.participants
    }
    setIsLoading(true)
    if (group.id) {
      const { ok } = await updateGroup(data, group?.id ?? '')

      if (ok) {
        toast.success(t('successfullyUpdated'))
        setTimeout(() => {
          router.push(`${Routes.GROUPS}/${group.id}`)
        }, 1500)
      } else {
        setIsLoading(false)
        toast.error(t('somethingWrong'))
      }
    } else {
      const { ok } = await createGroup(data)

      if (ok) {
        toast.success(t('successfullyCreated'))
        setTimeout(() => {
          router.push(Routes.GROUPS)
        }, 1500)
      } else {
        setIsLoading(false)
        toast.error(t('somethingWrong'))
      }
    }
  }

  const categoryOptions = [
    Category.Celebration,
    Category.House,
    Category.Project,
    Category.Relationship,
    Category.Travel,
    Category.Others
  ]

  const title = group.name ? t('editGroup') : t('createGroup')

  return (
    <FormContainer title={title}>
      <Formik
        initialValues={group}
        validateOnChange
        validationSchema={validationSchemaNewGroup()}
        onSubmit={values => {
          handleSubmit({ ...values })
        }}
      >
        {props => {
          const { values, isValid, touched, errors, setFieldValue, handleSubmit, validateField } = props

          const nameError = ((touched.name || values.name) && errors.name && t(`name.errors.${errors.name}`)) || ''
          const descriptionError =
            ((touched.description || values.description) &&
              errors.description &&
              t(`description.errors.${errors.description}`)) ||
            ''

          const onSubmit: FormEventHandler<HTMLFormElement> = e => {
            e.preventDefault()
            if (values.participants.length === 0) {
              validateField('participants')
            }
            handleSubmit()
          }

          return (
            <Form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <label htmlFor="name" className={styles.label}>
                  {t('name.label')} <span className={styles.required}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder={t('name.placeholder')}
                  onChange={e => setFieldValue('name', e.target.value)}
                  className={`${styles.input} ${nameError && styles.error}`}
                />
                <p className={styles.errorText}>{nameError}</p>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="description" className={styles.label}>
                  {t('description.label')}
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={values.description}
                  placeholder={t('description.placeholder')}
                  onChange={e => setFieldValue('description', e.target.value)}
                  className={`${styles.input} ${descriptionError && styles.error}`}
                />
                <p className={styles.errorText}>{descriptionError}</p>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="category" className={styles.label}>
                  {t('category.label')} <span className={styles.required}>*</span>
                </label>
                <select
                  value={values.category}
                  className={styles.input}
                  onChange={e => setFieldValue('category', e.target.value)}
                >
                  {categoryOptions.map(category => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label}>
                  {t('participants.label')} {'('}
                  {values.participants.length}
                  {') '}
                  <span className={styles.required}>*</span>
                </label>

                <Participants participants={values.participants} setFieldValue={setFieldValue} />
              </div>
              <button type="submit" disabled={!isValid || isLoading} className={styles.submitButton}>
                {t(group.name ? 'editGroup' : 'createGroup')}
              </button>
            </Form>
          )
        }}
      </Formik>
    </FormContainer>
  )
}
