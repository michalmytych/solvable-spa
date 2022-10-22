import React from 'react'

export default function Progress({ percentage }) {
  return (
    <div
      style={{
        width: '20rem',
        height: '3px',
        margin: '0 auto',
        marginTop: '2rem',
        border: '1px solid rgb(184, 184, 184)'
      }}
    >
      <div style={{
        width: `${percentage}%`,
        transition: '0.4s',
        height: '3px',
        backgroundColor: 'black'
      }}></div>
    </div>
  )
}
