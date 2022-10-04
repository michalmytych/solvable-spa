import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAll } from '../../features/solutions'

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    getAll(setSolutions)
  }, [])

  return (
    <div>
      <h1>Solutions</h1>
      <Link to="/commit">Add new solution</Link>
      <div>
        {solutions.data?.map((solution, index) => {
          return (
            <li key={index}>{solution.id} - Status: {solution.status}</li>
          )
        })}
      </div>
    </div>
  )
}
