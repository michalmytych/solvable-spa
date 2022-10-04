import React, { useEffect, useState } from 'react'
import { getAll } from '../../features/solutions'

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    getAll(setSolutions)
  }, [])

  return (
    <div>
      Solutions page.
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
