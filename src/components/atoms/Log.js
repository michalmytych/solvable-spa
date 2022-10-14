import React from 'react'

export default function Log({ map, ix }) {
  return (
    <div key={ix}>
      <h5>{map.header}</h5>
      <ul>
        {
          map.attributes.map((attr, _ix) => (
            <li style={{ display: 'block' }} key={`attr${_ix}`}>
              <strong>{attr.key}</strong>  {attr.value}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
