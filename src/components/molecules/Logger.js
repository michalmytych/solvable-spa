import React, { useState } from 'react'

const baseLogs = [
  { content: '🟢 Test 1/10 Passed!' },
  { content: '🟢 Test 2/10 Passed!' },
  { content: '🟢 Test 3/10 Passed!' },
  {
    content: (
      <details>
        <summary>
          🔴 Test 3/10 Failed :(
        </summary>
        Valid solution requested in problem: 123.23
        <br/>
        Your answer was: -1
      </details>
    )
  }
]

export default function Logger() {
  const [logs, setLogs] = useState(baseLogs)

  return (
    <ul className='loggerList'>
      {
        logs.map(log => {
          return (
            <li>
              {log.content}
            </li>
          )
        })
      }
    </ul>
  )
}
