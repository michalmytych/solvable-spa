import React from 'react'
import Select from '../../components/atoms/Select'

export default function Commit() {
  return (
    <div>
      <h1>Commit a solution</h1>
      <Select items={[
        {
          id: 1,
          name: 'Sugar'
        },
        {
          id: 2,
          name: 'Salt'
        },
        {
          id: 3,
          name: 'Pepper'
        }
      ]} selectedValue={2}></Select>
    </div>
  )
}
