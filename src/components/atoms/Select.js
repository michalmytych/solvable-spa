import React, { useEffect, useState } from 'react'
import { firstWhere } from '../../helpers'

const resolveOptions = (items) => {
  if (items instanceof Array) {
    return items
  }

  if (items instanceof Function) {
    return items()
  }
}

export default function Select({ items = [], _value = 'id', _key = 'name', onSelect }) {
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState()

  useEffect(() => {
    setOptions(resolveOptions(items))
  }, [items])

  useEffect(() => {
    onSelect(selectedOption)
  }, [selectedOption, onSelect])

  return (
    <div>
      <select onChange={(e) => {
        const selected = firstWhere(items, _value, e.target.value)
        setSelectedOption(selected)
      }}>
        <option value={null} selected>Select...</option>
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
