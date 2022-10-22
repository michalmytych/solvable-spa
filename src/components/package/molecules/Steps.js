import React, { useState } from 'react'

const baseSteps = [
  { content: 'Test 1/10 Passed!' },
  { content: 'Test 2/10 Passed!' },
  { content: 'Test 3/10 Passed!' },
  { content: 'Test 3/10 Failed :(' }
]

export default function Steps() {
  const [steps, setSteps] = useState(baseSteps)

  return (
    <div className="steps">
      {
        steps.map(step => (
          <div>
            <div className="step"></div>
            {/* <div>{step.content}</div> */}
            <div className="stepJoin"></div>
          </div>
        ))
      }
    </div>
  )
}
