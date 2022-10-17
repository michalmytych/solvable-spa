import React, { useEffect, useState } from 'react'
import Table from '../../components/molecules/Table'
import Header from '../../components/atoms/Header'
import Moment from 'moment'
import { getAll as getAllProblems } from '../../features/problems'
import Page from '../../components/atoms/Page'

const problemsTableAbstract = {
  structure: {
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

export default function Problems({ alertSetter }) {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    getAllProblems(setProblems, alertSetter)
  }, [])

  return (
    <Page>
      <Header text="Problems"/>
      <Table
        data={problems.data}
        tableAbstract={problemsTableAbstract}
      />
    </Page>
  )
}
