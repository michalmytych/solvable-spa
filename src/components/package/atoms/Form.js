import React from 'react'
import styled from 'styled-components'

const FormWrapperStyled = styled.div`
  text-align: center;
`

export default function Form({ children }) {
  return (
    <FormWrapperStyled>
      <form>
        {children}
      </form>
    </FormWrapperStyled>
  )
}
