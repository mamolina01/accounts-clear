import { getGroupById } from '@/actions'
import { BalanceForm, ContainerForm } from '@/components'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id?: string[]
  }
}

const CreateCount = async ({ params }: Props) => {
  const groupId = params.id ? params.id[0] : ''
  const { group } = await getGroupById(groupId)

  if (!group && groupId) {
    redirect('/balance/submit')
  }
  const title = group ? 'Edit balance' : 'New balance'

  return (
    <ContainerForm title={title}>
      <BalanceForm />
    </ContainerForm>
  )
}

export default CreateCount
