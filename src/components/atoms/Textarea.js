import React from 'react'

export default function Textarea({ cols = 40, rows = 10, value = '', onChangeHandler, disabled = false }) {
  return (
    <div>
      <textarea
        cols={cols}
        rows={rows}
        disabled={disabled}
        onChange={e => onChangeHandler(e.target.value)}
      >
        {value}
      </textarea>
    </div>
  )
}
