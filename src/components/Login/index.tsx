import { FC, useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

import PasswordInput from './components/PasswordInput'
import usePasswordStrength from '../../hooks/usePasswordStrength'

import './index.css'

const Login: FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [form] = Form.useForm()

  const { handlePasswordChange } = usePasswordStrength(password)

  useEffect(() => {
    if(isLogin) {
      const savedUserName = localStorage.getItem('userName')
      const savedPassword = localStorage.getItem('password')

      if(savedUserName) setUserName(savedUserName)
      if(savedPassword) setPassword(savedPassword)
    } else {
      localStorage.removeItem('userName')
      localStorage.removeItem('password')
      form.resetFields()
    }
  }, [isLogin])

  const handleSubmit = () => {
    if(isLogin) {
      console.log('登录信息:', { userName, password, rememberMe })

      if(rememberMe) {
        localStorage.setItem('userName', userName)
        localStorage.setItem('password', password)
      } else {
        localStorage.removeItem('userName')
        localStorage.removeItem('password')
      }
    } else {
      if(password === checkPassword) {
        console.log('注册信息:', { userName, password })
      } else {
        console.error('两次输入的密码不匹配')
      }
    }
  }

  const handleSwitch = () => {
    if(isLogin) {
      form.resetFields()
    }
    setIsLogin(!isLogin)
  }

  return (
    <div className="login-container">
      <div className="login-bg"/>

      <div className="login-form-container">
        <div className="form-content">
          <h2 className="form-title">{isLogin ? '登录' : '注册'}</h2>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="用户名"
              name="userName"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              {
                isLogin ?
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  :
                  <PasswordInput
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
              }
            </Form.Item>

            {!isLogin && (
              <Form.Item
                label="确认密码"
                name="checkPassword"
                rules={[{ required: true, message: '请确认密码' }]}
              >
                <Input.Password
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)}
                />
              </Form.Item>
            )}

            {isLogin && (
              <Form.Item>
                <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                  记住我
                </Checkbox>
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" block htmlType="submit">
                {isLogin ? '登录' : '注册'}
              </Button>
            </Form.Item>
          </Form>

          <div className="switch-link">
            <Button type="link" onClick={handleSwitch}>
              {isLogin ? '没有账户？去注册' : '已有账户？去登录'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
