import React, { Fragment } from 'react'
import styled from 'styled-components'
import { regulateText } from '../../../helpers'

const BadgeStyled = styled.div`
  border-radius: 12px;
  box-shadow: 1px 1px 1px black;
  height: 13px;
  min-width: 14px;
  padding: 0 1px 1px 1px;
  text-align: center;
  font-size: 0.7rem;
  color: white;
  background-color: ${props => props.color};
  position: absolute;
  bottom: 14px;
  left: 16px;
`

export default function Badge({ children, display, text, color = 'red' }) {
  if (!display) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <Fragment>
      <BadgeStyled color={color}>
        {regulateText(text)}
      </BadgeStyled>
      {children}
    </Fragment>
  )
}
