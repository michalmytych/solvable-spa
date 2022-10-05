import React from 'react'

export default function Button({ text = 'Click', onClickHandler, disabled = false }) {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={e => onClickHandler(e)}
      >
        {text}
      </button>
    </div>
  )
}
