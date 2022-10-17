import React, { useEffect, useState } from 'react'

/* 

Table component needs to know what is the structure
of data you want to display in it.

Example:

const exampleTableAbstract = {
  structure: {
    columns: [
      {
        key: 'example_json_key',
        header: 'Example displayed table header',
        type: 'datetime', - data type
        fx: (cell) => Moment(cell).format('DD.MM.YYYY') - formatting function
      }
    ]
  }
} 

*/

export default function Table({ data, tableAbstract }) {
  const [columnsData, setColumnsData] = useState([])

  useEffect(() => {
    setColumnsData(data)
  }, [data])

  return (
    <div>
      <table>
        <tbody style={{ textAlign: 'left' }}>
          <tr>
            {
              tableAbstract.structure.columns.map(column => (
                <th key={column.header}>
                  <strong>
                    {column.header}
                  </strong>
                </th>
              ))
            }
          </tr>
          {
            columnsData?.map((row) => (
              <tr>
                {
                  tableAbstract.structure.columns.map(column => (
                    <td>
                      {column.fx ? column.fx(row[column.key]) : row[column.key]}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
