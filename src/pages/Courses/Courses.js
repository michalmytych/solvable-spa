import { BaseTable } from '../../components/molecules/Table'
import Table from '../../components/molecules/Table'
import Moment from 'moment'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllCourses,
  getCoursesError,
  getCoursesStatus,
  fetchCourses
} from '../../features/courses/coursesSlice'

class ProblemsTable extends BaseTable {
  constructor() {
    super()
    this.structure = {
      columns: [
        {
          key: 'name',
          header: 'Name',
          type: 'string'
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

const coursesTableAbstract = new ProblemsTable()

export default function Problems() {
  const dispatch = useDispatch()

  const courses = useSelector(selectAllCourses)
  const coursesStatus = useSelector(getCoursesStatus)
  const coursesError = useSelector(getCoursesError)

  useEffect(() => {
    if (coursesStatus === 'idle') {
      dispatch(fetchCourses())
    }
  }, [coursesStatus, dispatch])

  return (
    <div>
      <h1>Courses from redux store</h1>
      {coursesStatus === 'loading' ? <h5>Loading...</h5> : null}
      {coursesStatus === 'succeeded' ?
        <Table
          data={courses}
          tableAbstract={coursesTableAbstract}
        />
        : null}
      {coursesStatus === 'error' ? <h5>{coursesError}</h5> : null}
    </div>
  )
}
