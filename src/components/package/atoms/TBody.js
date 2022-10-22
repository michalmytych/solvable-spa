import React from 'react'

export default function TBody({ children }) {
  return (
    <table>
      <tbody style={{ textAlign: 'left' }}>
        {children}
      </tbody>
    </table>
  )
}
