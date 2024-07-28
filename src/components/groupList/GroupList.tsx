import { GroupItem } from './groupItem/GroupItem'
import { FormContainer } from '..'
import { EmptyGroups } from './emptyGroups/EmptyGroups'
import { useTranslations } from 'next-intl'
import { ActionButtons } from './actionButtons/ActionButtons'

interface Props {
  id: string
  name: string
  description: string
}
export const GroupList = ({ groups }: { groups: Props[] }) => {
  const t = useTranslations('groupList')
  return (
    <FormContainer title={t('title')}>
      {groups.length === 0 ? <EmptyGroups /> : groups.map(group => <GroupItem group={group} key={group.id} />)}

      <ActionButtons />
    </FormContainer>
  )
}
