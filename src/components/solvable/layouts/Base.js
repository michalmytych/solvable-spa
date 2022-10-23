import React, { Fragment, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { initChannelAndEvents, uniqueByKey } from '../../../helpers'
import { usePusher } from '../../../hooks/usePusher'
import Notifications from '../../package/molecules/Notifications'
import styled from 'styled-components'

const navLinks = {
  authenticated: [
    { to: "/", label: "Home" },
    { to: "/solutions", label: "Solutions" },
    { to: "/problems", label: "Problems" },
    { to: "/courses", label: "Courses" }
  ],
  notAuthenticated: [],
}

const NavBarStyled = styled.div`
  display: flex;
  background-color: rgb(38, 38, 39);
`

const NavStyled = styled.div`
  margin: 0 auto;
  width: 60%;
  text-align: center;
  display: block;
  height: 2.3rem;
  padding-top: 1rem;
`

const MainStyled = styled.main`
  margin: 0 auto;
  width: 40%;
`

const UnorderedListStyled = styled.ul`
  padding: 0;
  margin: 0;
`

const ListElementStyled = styled.ul`
  display: inline-block;
  margin: 0 2rem;
`

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
    <Fragment>
      <NavBarStyled>
        <NavStyled>
          <UnorderedListStyled>
            {links.map(link => {
              return (
                <ListElementStyled key={link.label}>
                  {/* @todo - move to styled component */}
                  <Link className='navLink' to={link.to}>{link.label}</Link>
                </ListElementStyled>
              );
            })}
          </UnorderedListStyled>
        </NavStyled>
        <Notifications notifications={notifications} />
      </NavBarStyled>
      <MainStyled>
        <Outlet />
      </MainStyled>
    </Fragment>
  )
}
