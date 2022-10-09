import React from 'react'
import { BaseTable } from '../../components/molecules/Table'
import Table from '../../components/molecules/Table'
import Moment from 'moment'

class ExampleTable extends BaseTable {
  constructor() {
    super()
    this.structure = {
      columns: [
        {
          key: 'name',
          header: 'Name',
          type: 'string',
          filterable: true,
          sortable: true,
          expandable: true,
          expandableJsx: <h1>Hello world!</h1>,
          onEmpty: '-',
          fx: (cell) => cell.toLowerCase(),
          onClick: (e) => e.target,
          onHover: (e) => e.target,
        },
        {
          key: 'staff',
          header: 'Is staff',
          type: 'boolean',
          fx: (cell) => cell ? <strong>Yes</strong> : <strong>No</strong>
        },
        {
          key: 'created_at',
          header: 'Joined at',
          type: 'date',
          fx: (cell) => Moment(cell).format('DD.MM.YYYY')
        }
      ]
    }
  }

  getDataFetchParams() {
    return {}
  }
}

const dataFetch = () => {
  return [
    { name: 'John Doe', staff: true, created_at: '07-02-2019' },
    { name: 'Emma Darcy', staff: false, created_at: '01-24-2017' },
    { name: 'Evan McGregor', staff: false, created_at: '03-19-2018' },
    { name: 'Emma Stone', staff: true, created_at: '07-02-2018' },
    { name: 'Keanu Reeves', staff: true, created_at: '04-16-2014' },
  ]
}

export default function Problems() {
  return (
    <div>
      <Table
        dataFetch={dataFetch}
        tableAbstract={new ExampleTable()}
      />
    </div>
  )
}
