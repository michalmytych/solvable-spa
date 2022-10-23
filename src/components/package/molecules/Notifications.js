import React from 'react'
import { ReactComponent as BellIcon } from '../../../assets/icons/bell-icon.svg'
import Badge from '../atoms/Badge';
import styled from 'styled-components';

const NotificationsWrapper = styled.div`
  cursor: pointer;
`

const BellWrapperStyled = styled.div`
  position: relative;
  top: 0.9rem;
  right: 1.5rem;
`

export default function Notifications({ onClick, notifications = [] }) {
  return (
    <NotificationsWrapper onClick={onClick}>
      <BellWrapperStyled>
        <Badge display={notifications.length} text={notifications.length}>
          <BellIcon fill="white" />
        </Badge>
      </BellWrapperStyled>
    </NotificationsWrapper>
  )
}
