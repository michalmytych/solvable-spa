import React, { useEffect, useState } from 'react'
import { BaseTable } from '../../components/molecules/Table'
import Table from '../../components/molecules/Table'
import Moment from 'moment'
import { getAll as getAllProblems } from '../../features/problems'

class ProblemsTable extends BaseTable {
  constructor() {
    super()
    this.structure = {
      columns: [
        {
          key: 'title',
          header: 'Title',
          type: 'string'
        },
        {
          key: 'chars_limit',
          header: 'Characters limit',
          type: 'int'
        },
        {
          key: 'created_at',
          header: 'Added at',
          type: 'datetime',
          fx: (cell) => Moment(cell).format('DD.MM.YYYY')
        }
      ]
    }
  }
}

export default function Problems() {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    getAllProblems(setProblems)
  }, [])

  return (
    <div>
      <h1>Problems</h1>
      <Table
        data={problems.data}
        tableAbstract={new ProblemsTable()}
      />
    </div>
  )
}
