import React, { useEffect, useState } from 'react'

const evaluateOptions = (items) => {
  if (items instanceof Array) {
    return items
  }

  if (items instanceof Function) {
    return items()
  }
}

export default function Select({ items = [], _value = 'id', _key = 'name', selectedValue}) {
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState()

  useEffect(() => {
    setOptions(evaluateOptions(items))
    setSelectedOption(selectedValue)
  }, [items, selectedValue])

  return (
    <div>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        {options.map((option) => {
          return <option
            key={option[_value]}
            value={option[_value]}
          >
            {option[_key]}
          </option>
        })}
      </select>
    </div>
  )
}
