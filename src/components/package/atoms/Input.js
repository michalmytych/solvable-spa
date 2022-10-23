import React from 'react'

export default function Input({ type = 'text', value, disabled = false, onChangeHandler }) {
  return (
    // @todo - move global input styles to styled components
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChangeHandler(e.target.value)}
    />
  )
}
