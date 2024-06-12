import { getGroupById } from '@/actions'
import { BalanceForm, ContainerForm } from '@/components'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { GroupInfo } from '@/types/group'
import { Category } from '@prisma/client'

interface Props {
  params: {
    id?: string[]
  }
}

const Balance = async ({ params }: Props) => {
  const groupId = params.id ? params.id[0] : ''
  const { group } = await getGroupById(groupId)
  const session = await auth()

  if (!group && groupId) {
    redirect('/balance/submit')
  }
  const title = group ? 'Edit balance' : 'New balance'

  const initialValues: GroupInfo = {
    name: '',
    description: '',
    category: Category.Travel,
    participants: []
  }

  if (session) {
    initialValues.participants.push({
      name: session?.user?.name,
      id: session?.user?.id,
      assignedCosts: []
    })
  }

  return (
    <ContainerForm title={title}>
      <BalanceForm group={group ?? initialValues} />
    </ContainerForm>
  )
}

export default Balance
