import React, { useEffect, useState } from 'react'

export class BaseTable {
  constructor() {
    this.structure = {
      columns: []
    }
  }

  getDataFetchParams() { }
}

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
