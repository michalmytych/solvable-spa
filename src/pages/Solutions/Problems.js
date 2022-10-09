import React from 'react'
import { BaseTable } from '../../components/molecules/Table' 
import Table from '../../components/molecules/Table'

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
    {name: 'John Doe', staff: true, created_at: '07-02-2019'},
    {name: 'Emma Darcy', staff: false, created_at: '24-01-2017'},
    {name: 'Evan McGregor', staff: false, created_at: '19-03-2018'},
    {name: 'Emma Stone', staff: true, created_at: '02-07-2018'},
    {name: 'Keanu Reeves', staff: true, created_at: '16-04-2014'},
  ]
}

const tableAbstract = new ExampleTable()

export default function Problems() {
  return (
    <div>
      <Table 
        dataFetch={dataFetch}
        tableAbstract={tableAbstract}
      />
    </div>
  )
}
