import React from 'react'
import { Link } from 'react-router-dom'
import { isUserAuthenticated } from '../features/auth'

export default function Home() {
  return (
    <div>
      <h1>Solvable</h1>
      <h3>Backend for an application for interactive programming learning.</h3>
      {isUserAuthenticated() ? <h4>You are logged in.</h4> : <Link to={'/login'} />}
    </div>
  )
}
