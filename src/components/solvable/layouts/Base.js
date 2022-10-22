import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { initChannelAndEvents, uniqueByKey } from '../../../helpers'
import { usePusher } from '../../../hooks/usePusher'
import Notifications from '../../package/molecules/Notifications'

const navLinks = {
  authenticated: [
    { to: "/", label: "Home" },
    { to: "/solutions", label: "Solutions" },
    { to: "/problems", label: "Problems" },
    { to: "/courses", label: "Courses" }
  ],
  notAuthenticated: [
    // @todo - login is not signup
    { to: "/login", label: "Sign up" }
  ],
}

export default function Base({ isUserLoggedIn }) {
  const pusher = usePusher()

  const [links, setLinks] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (isUserLoggedIn) {
      return setLinks(navLinks.authenticated)
    }
    setLinks(navLinks.notAuthenticated)
  }, [isUserLoggedIn])

  useEffect(() => {
    if (isUserLoggedIn) {
      initChannelAndEvents(
        pusher,
        'general-notifications', [
        {
          event: 'sent-general-notification',
          handler: (data) => setNotifications(
            notifications => uniqueByKey([...notifications, data], 'id')
          )
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // @todo - extract components
    <div>
      {/* @todo - extractStyledComponent */}
      <div class="navBar">
        <nav>
          <ul>
            {links.map(link => {
              return (
                <li key={link.label}>
                  {/* @todo - move to styled component */}
                  <Link className='navLink' to={link.to}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Notifications notifications={notifications} />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
