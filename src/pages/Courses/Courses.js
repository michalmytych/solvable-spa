import Table from '../../components/molecules/Table'
import Page from '../../components/atoms/Page'
import Header from '../../components/atoms/Header'
import Moment from 'moment'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllCourses,
  getCoursesError,
  getCoursesStatus,
  fetchCourses
} from '../../features/courses/coursesSlice'
import Info from '../../components/atoms/Info'

const coursesTableAbstract = {
  structure: {
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

  // https://www.youtube.com/watch?v=93CR_yURoII 18:33 @todo

  return (
    <Page>
      <Header text="Courses" />
      {coursesStatus === 'loading' ?
        <Header text="Loading..." type="h5" />
        : null}
      {coursesStatus === 'succeeded' ?
        <Table
          data={courses}
          tableAbstract={coursesTableAbstract}
        />
        : null}
      {coursesStatus === 'failed' ?
        <Info type="danger" text={coursesError} />
        : null}
    </Page>
  )
}
