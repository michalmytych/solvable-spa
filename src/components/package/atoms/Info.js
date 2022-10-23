import React from 'react'
import styled from 'styled-components'

const InfoStyled = styled.div`
  color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem;
  width: 20rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${props => props.type === 'danger' ? '#ce2b2b' : '#236dcd'};
`

export default function Info({ children, text = '', type = "default" }) {
  return (
    <InfoStyled type={type}>
      ⓘ {children}{text}
    </InfoStyled>
  )
}
