import React from 'react'

export default function Form({ children }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <form>
        {children}
      </form>
    </div>
  )
}
