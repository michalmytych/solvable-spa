import React from 'react'

export default function Button({ text = 'Click', onClickHandler }) {
  return (
    <div>
      <button onClick={e => onClickHandler(e)}>
        {text}
      </button>
    </div>
  )
}
