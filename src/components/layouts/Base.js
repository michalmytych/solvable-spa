import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const navLinks = {
  authenticated: [
    { to: "/", label: "Home" },
    { to: "/solutions", label: "Solutions" },
    { to: "/problems", label: "Problems" },
    { to: "/courses", label: "Courses" }
  ],
  notAuthenticated: [
    // @todo
    { to: "/login", label: "Sign up" }
  ],
}

export default function Base({ isUserLoggedIn }) {
  const [links, setLinks] = useState([])

  useEffect(() => {
    if (isUserLoggedIn) {
      return setLinks(navLinks.authenticated)
    }
    setLinks(navLinks.notAuthenticated)
  }, [isUserLoggedIn])

  return (
    // @todo - extract components
    <div>
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
      <main>
        <Outlet />
      </main>
    </div>
  )
}
