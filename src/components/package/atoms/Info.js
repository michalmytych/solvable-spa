import React from 'react'
import styled from 'styled-components'

const InfoStyled = styled.div`
  background-color: ${props => {
    if (props.type === 'danger') {
      return '#ce2b2b'
    }

    return '#236dcd'
  }};
  color: #ffffff;
  border-radius: '6px';
  padding: '0.5rem';
  width: '20rem';
  margin-top: '1rem';
  margin-bottom: '1rem';
`

export default function Info({ children, text = '', type = "default" }) {
  return (
    <InfoStyled type={type}>
      ⓘ {children}{text}
    </InfoStyled>
  )
}
