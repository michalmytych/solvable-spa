import React from 'react'

export default function Row({ tableColumns, rowData = null, type = "data" }) {
  if (type === "header") {
    return (
      <tr>
        {
          tableColumns.map(column => (
            <th key={column.header}>
              <strong>
                {column.header}
              </strong>
            </th>
          ))
        }
      </tr>
    )
  }

  if (type === "data") {
    return (
      <tr>
        {
          tableColumns.map((column, ix) => {
            try {
              return (
                <td key={`column_${ix}`}>
                  {column.fx ? column.fx(rowData[column.key]) : rowData[column.key]}
                </td>
              )
            } catch (error) {
              console.error(`Cell data formatting error ${error}`)
            }

            return (
              <td>{rowData[column.key]}</td>
            )
          })
        }
      </tr>
    )
  }

  return (
    <tr>
      <td>Empty row</td>
    </tr>
  )
}
