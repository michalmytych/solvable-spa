import React from 'react'
import { ReactComponent as BellIcon } from '../../../assets/icons/bell-icon.svg'
import Badge from '../atoms/Badge';

export default function Notifications({ onClick, notifications = []}) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* @todo - move styles */}
      <div className='bellIconWrapper'>
        <Badge display={notifications.length} text={notifications.length}>
          <BellIcon fill="white" />
        </Badge>
      </div>
    </div>
  )
}
