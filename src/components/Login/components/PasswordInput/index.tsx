import { FC, Fragment, ChangeEvent } from "react"
import { Input } from 'antd'

import usePasswordStrength from '../../../../hooks/usePasswordStrength'

import './index.css'

interface PasswordInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput: FC<PasswordInputProps> = (props) => {
  const { value, onChange } = props
  const { strength, handlePasswordChange } = usePasswordStrength(value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    handlePasswordChange(newPassword)
    onChange(e)
  }

  return (
    <Fragment>
      <Input.Password
        value={value}
        onChange={handleChange}
        placeholder="请输入密码"
      />
      <div className="mt-2 password-strength">
        {value && <span>密码强度: <i>{strength}</i></span>}
      </div>
    </Fragment>
  )
}

export default PasswordInput
