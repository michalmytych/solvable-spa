import React from 'react'

const regulateText = (text) => {
  // @todo - add handling regular strings
  const number = parseInt(text)

  if (number && number > 99) {
    return '99+'
  }

  return text
}

export default function Badge({ children, display, text, color = 'red' }) {
  if (!display) {
    return <div>{children}</div>
  }

  return (
    <div>
      {/* @todo extract styled component */}
      <div style={{
        borderRadius: '12px',
        boxShadow: '1px 1px 1px black',
        height: '13px',
        minWidth: '14px',
        padding: '0 1px 1px 1px',
        textAlign: 'center',
        fontSize: '0.7rem',
        color: 'white',
        backgroundColor: color,
        position: 'absolute',
        bottom: '14px',
        left: '16px',
      }}>
        {regulateText(text)}
      </div>
      {children}
    </div>
  )
}
