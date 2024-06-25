export const InputNumber = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const isNumericKey = (key: string): boolean => {
    return /\d/.test(key)
  }

  const isSpecialHandlerKey = (key: string): boolean => {
    const SPECIAL_KEYS: string[] = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
    const isAllowedKey = SPECIAL_KEYS.find(specialKey => specialKey === key)
    if (isAllowedKey) {
      return true
    }
    return false
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const error1 = !isNumericKey(e.key) && !isSpecialHandlerKey(e.key) // if onlynumbers, allow numbers or delete keys
    if (error1) {
      e.preventDefault()
    }
  }

  return <input onKeyDown={handleKeyDown} {...rest} />
}
