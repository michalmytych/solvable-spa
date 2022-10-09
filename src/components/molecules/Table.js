import React, { useEffect, useState } from 'react'

export class BaseTable {
  constructor() {
    this.structure = {
      columns: []
    }
  }

  getDataFetchParams() { }
}

export default function Table({ dataFetch, tableAbstract }) {
  const [columnsData, setColumnsData] = useState([])

  useEffect(() => {
    async function getData() {
      setColumnsData(dataFetch(tableAbstract))
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <table>
        <tbody style={{ textAlign: 'left' }}>
          <tr>
            {
              tableAbstract.structure.columns.map(column => {
                return (
                  <th>
                    <strong>
                      {column.header}
                    </strong>
                  </th>
                )
              })
            }
          </tr>
          {
            columnsData.map((row, ix) => {
              return (
                <tr key={ix}>
                  {
                    tableAbstract.structure.columns.map(column => {
                      return (
                        <td>
                          {column.fx ? column.fx(row[column.key]) : row[column.key]}
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
