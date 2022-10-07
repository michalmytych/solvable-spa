import React, { useEffect } from 'react'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import { useState } from 'react'
import { login } from '../../features/auth'

export default function Login({ onAuthSuccess }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    if (loggingIn) {
      login(
        {
          email: email,
          password: password
        },
        () => onAuthSuccess(),
        () => setLoggingIn(false)
      )
    }
  }, [email, loggingIn, onAuthSuccess, password])

  return (
    <div style={{ textAlign: 'center' }}>
      <form>
        <Input
          type={'email'}
          value={email}
          onChangeHandler={setEmail}
          disabled={loggingIn}
        />
        <br />
        <Input
          type={'password'}
          value={password}
          onChangeHandler={setPassword}
          disabled={loggingIn}
        />
        <Button
          text={'Sign in'}
          disabled={loggingIn}
          onClickHandler={() => setLoggingIn(true)}
        />
      </form>
    </div>
  )
}
