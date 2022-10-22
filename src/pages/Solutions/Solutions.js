import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/package/molecules/Table'
import Page from '../../components/package/atoms/Page'
import Moment from 'moment'
import { resolveSolutionStatus } from '../../features/solutions/solutionsApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSolutions,
  getSolutionsError,
  getSolutionsStatus,
  selectAllSolutions
} from '../../features/solutions/solutionsSlice'
import Header from '../../components/package/atoms/Header'
import Info from '../../components/package/atoms/Info'

const solutionsTableAbstract = {
  structure: {
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

export default function Solutions() {
  const dispatch = useDispatch()

  const solutions = useSelector(selectAllSolutions)
  const solutionsStatus = useSelector(getSolutionsStatus)
  const solutionsError = useSelector(getSolutionsError)

  useEffect(() => {
    if (solutionsStatus === 'idle') {
      dispatch(fetchSolutions())
    }
  }, [solutionsStatus, dispatch])

  return (
    <Page>
      <Header text="Solutions" />
      <Link to="/commit">Add new solution</Link>
      {solutionsStatus === 'loading' ? <Header text="Loading..." /> : null}
      {solutionsStatus === 'succeeded' ?
        <Table
          data={solutions}
          tableAbstract={solutionsTableAbstract}
        />
        : null}
      {solutionsStatus === 'failed' ? <Info type="danger" text={solutionsError} /> : null}
    </Page>
  )
}
