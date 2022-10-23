import React from 'react'
import styled from 'styled-components'

const TBodyStyled = styled.tbody`
  text-align: left;
`

export default function TBody({ children }) {
  return (
    <table>
      <TBodyStyled>
        {children}
      </TBodyStyled>
    </table>
  )
}
