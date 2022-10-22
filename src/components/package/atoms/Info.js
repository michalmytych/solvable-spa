import React from 'react'

export default function Info({ children, text = '', type = "default" }) {
  // @todo - do it wiser
  let textColor = "#ffffff"
  let bgColor = "#236dcd"

  if (type === "danger") {
    bgColor = "#ce2b2b"
  }

  return (
    <div
      style={{
        // @todo - move to styled components
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '6px',
        padding: '0.5rem',
        width: '20rem',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      ⓘ {children}{text}
    </div>
  )
}
