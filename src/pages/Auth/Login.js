import React, { useEffect } from 'react'
import Button from '../../components/package/atoms/Button'
import Input from '../../components/package/atoms/Input'
import { useState } from 'react'
import { login } from '../../features/auth'
import Form from '../../components/package/atoms/Form'
import Page from '../../components/package/atoms/Page'
import Header from '../../components/package/atoms/Header'

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
    <Page>
      <Header text="Log in" />
      <Form>
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
      </Form>
    </Page>
  )
}
