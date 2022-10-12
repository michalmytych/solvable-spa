import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table, { BaseTable } from '../../components/molecules/Table'
import Moment from 'moment'
import { getAll as getAllSolutions, resolveSolutionStatus } from '../../features/solutions'

class SolutionsTable extends BaseTable {
  constructor() {
    super()
    this.structure = {
      columns: [
        {
          key: 'id',
          header: 'ID',
          type: 'string',
          fx: (cell) => cell.slice(0, 12)
        },
        {
          key: 'status',
          header: 'Status',
          type: 'int',
          fx: (cell) => resolveSolutionStatus(cell)
        },
        {
          key: 'created_at',
          header: 'Added at',
          type: 'datetime',
          fx: (cell) => Moment(cell).format('hh:mm:ss DD.MM.YYYY')
        }
      ]
    }
  }
}

export default function Solutions({ alertSetter }) {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    getAllSolutions(setSolutions, alertSetter)
  }, [alertSetter])

  return (
    <div>
      <h1>Solutions</h1>
      <Link to="/commit">Add new solution</Link>
      {/* todo */}
      <div style={{ height: '20px' }}></div>
      <Table
        data={solutions.data}
        tableAbstract={new SolutionsTable()}
      />
    </div>
  )
}
