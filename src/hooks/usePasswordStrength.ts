import { useState } from 'react'

const PASSWORD_STRENGTH = {
  WEAK: '弱',
  MEDIUM: '中',
  STRONG: '强'
}

const getPasswordStrength = (password: string) => {
  const MIN_PASSWORD_LENGTH = 6

  if (password.length < MIN_PASSWORD_LENGTH) {
    return PASSWORD_STRENGTH.WEAK
  }

  let hasUpper = false
  let hasLower = false
  let hasDigit = false
  let hasSpecial = false

  for (const char of password) {
    if (char >= 'A' && char <= 'Z') hasUpper = true
    if (char >= 'a' && char <= 'z') hasLower = true
    if (char >= '0' && char <= '9') hasDigit = true
    if (char < 'A' || (char > 'Z' && char < 'a') || char > 'z') hasSpecial = true
  }

  if (hasUpper && hasLower && hasDigit && hasSpecial) {
    return PASSWORD_STRENGTH.STRONG
  }

  if (hasUpper && hasLower && hasDigit) {
    return PASSWORD_STRENGTH.MEDIUM
  }

  return PASSWORD_STRENGTH.WEAK
}

const usePasswordStrength = (initialPassword: string = '') => {
  const [password, setPassword] = useState(initialPassword)
  const [strength, setStrength] = useState(PASSWORD_STRENGTH.WEAK)

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword)
    setStrength(getPasswordStrength(newPassword))
  }

  return {
    password,
    strength,
    handlePasswordChange
  }
}

export default usePasswordStrength
