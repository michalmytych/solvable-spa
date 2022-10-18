import React, { useEffect } from 'react'
import Table from '../../components/molecules/Table'
import Header from '../../components/atoms/Header'
import Moment from 'moment'
import Page from '../../components/atoms/Page'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProblems, getProblemsError, getProblemsStatus, selectAllProblems } from '../../features/problems/problemsSlice'
import Info from '../../components/atoms/Info'

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

export default function Problems() {
  const dispatch = useDispatch()

  const problems = useSelector(selectAllProblems)
  const problemsStatus = useSelector(getProblemsStatus)
  const problemsError = useSelector(getProblemsError)

  useEffect(() => {
    if (problemsStatus === 'idle') {
      dispatch(fetchProblems())
    }
  }, [problemsStatus, dispatch])

  return (
    <Page>
      <Header text="Problems" />
      {problemsStatus === 'loading' ? <Header text="Loading..." /> : null}
      {problemsStatus === 'succeeded' ?
        <Table
          data={problems}
          tableAbstract={problemsTableAbstract}
        />
        : null}
      {problemsStatus === 'failed' ? <Info type="danger" text={problemsError} /> : null}
    </Page>
  )
}
