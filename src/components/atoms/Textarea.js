import React from 'react'

export default function Textarea({cols = 40, rows = 10, value = '', onChangeHandler}) {
  return (
    <div>
      <textarea cols={cols} rows={rows} onChange={e => onChangeHandler(e.target.value)}>
        {value}
      </textarea>
    </div>
  )
}
