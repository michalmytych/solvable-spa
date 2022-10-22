import React, { useEffect, useState } from 'react'
import Row from '../atoms/Row'
import TBody from '../atoms/TBody'

/* 
 *
 * Table component needs to know what is the structure
 * of data you want to display in it. That is why you
 * need to provide an object with it's structure to
 * table component.
 * 
 * Example:
 *
 * const exampleTableAbstract = {
 *  structure: {
 *    columns: [
 *      {
 *        key: 'example_json_key',
 *       header: 'Example displayed table header',
 *       type: 'datetime', 
 *       fx: (cell) => Moment(cell).format('DD.MM.YYYY')
 *     }
 *   ]
 * } 
 *
 */

export default function Table({ data, tableAbstract }) {
  const [columnsData, setColumnsData] = useState([])

  useEffect(() => {
    setColumnsData(data)
  }, [data])

  return (
    <TBody>
      <Row
        tableColumns={tableAbstract.structure.columns}
        type="header"
      />
      {
        columnsData?.map((rowData, ix) => (
          <Row
            key={`row_${ix}`}
            tableColumns={tableAbstract.structure.columns}
            rowData={rowData}
          />
        ))
      }
    </TBody>
  )
}
