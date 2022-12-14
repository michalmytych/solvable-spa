import React, { useEffect, useState } from 'react'
import Select from '../../components/package/atoms/Select'
import Textarea from '../../components/package/atoms/Textarea'
import Button from '../../components/package/atoms/Button'
import { addingIntegersInCpp, initChannelAndEvents, uniqueByKey } from '../../helpers'
import { commit } from '../../features/solutions/solutionsApi'
import Log from '../../components/package/atoms/Log'
import Moment from 'moment'
import Page from '../../components/package/atoms/Page'
import Header from '../../components/package/atoms/Header'
import { fetchProblems, getProblemsError, getProblemsStatus, selectAllProblems } from '../../features/problems/problemsSlice'
import { fetchLanguages, getLanguagesError, getLanguagesStatus, selectAllLanguages } from '../../features/languages/languagesSlice'
import { useDispatch, useSelector } from 'react-redux'
import Info from '../../components/package/atoms/Info'
import { usePusher } from '../../hooks/usePusher'

const executionLogsMap = (execution, ix) => ({
  header: `${parseInt(execution.passed) ? '🟢' : '​🔴'} Test ${ix + 1}`,
  attributes: [
    {
      key: 'Output',
      value: <small>{execution.output}</small>
    },
    {
      key: 'Memory used',
      value: execution.memory_used
    },
    {
      key: 'Execution time',
      value: execution.execution_time
    },
    {
      key: 'Passed',
      value: parseInt(execution.passed) ? 'Yes' : 'No'
    },
    {
      key: 'Executed at',
      value: Moment(execution.updated_at).format('hh:mm:ss DD.MM.YYYY')
    }
  ],
})

export default function Commit() {
  const dispatch = useDispatch()

  const problems = useSelector(selectAllProblems)
  const problemsStatus = useSelector(getProblemsStatus)
  const problemsError = useSelector(getProblemsError)
  const [problem, setProblem] = useState()

  const languages = useSelector(selectAllLanguages)
  const languagesStatus = useSelector(getLanguagesStatus)
  const languagesError = useSelector(getLanguagesError)
  const [language, setLanguage] = useState()

  const [executions, setExecutions] = useState([])
  const [code, setCode] = useState(addingIntegersInCpp)
  const [commited, setCommited] = useState(false)
  const [result, setResult] = useState()

  const pusher = usePusher()

  useEffect(() => {
    initChannelAndEvents(
      pusher,
      'solution-tests-executions-updates', [
      {
        event: 'executed-new-solution-test',
        handler: (data) => setExecutions(
          // @todo - why events are doubled?
          executions => uniqueByKey([...executions, data.execution], 'id')
        )
      },
      {
        event: 'finished-new-solution-testing',
        handler: (data) => alert('Zakończono')
      }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (problemsStatus === 'idle') {
      dispatch(fetchProblems())
    }
  }, [problemsStatus, dispatch])

  useEffect(() => {
    if (languagesStatus === 'idle') {
      dispatch(fetchLanguages())
    }
  }, [languagesStatus, dispatch])

  // @todo - move to redux toolkit
  useEffect(() => {
    async function postData(data) {
      if (commited) {
        return commit(data, setResult)
      }
    }
    postData({
      code: code,
      problem: problem,
      language: language,
    })
  }, [code, commited, language, problem])

  return (
    <Page>
      <Header text="Commit a solution" />
      <Header type="h3" text={problem ? problem.title : 'Select problem'} />
      <Select
        items={problems.data}
        _key={'title'}
        onSelect={setProblem}
        disabled={commited}
      />
      <Header type="h3" text={language ? language.name : 'Select language'} />
      <Select
        items={languages}
        onSelect={setLanguage}
        disabled={commited}
      />
      <Header type="h3" text="Write down your solution" />
      <Textarea
        value={code}
        onChangeHandler={setCode}
        disabled={commited}
      />
      <Button
        text='Save'
        onClickHandler={() => setCommited(true)}
        disabled={commited}
      />
      {problemsStatus === 'failed' ? <Info type="danger" text={problemsError} /> : null}
      {languagesStatus === 'failed' ? <Info type="danger" text={languagesError} /> : null}
      {result ?
        <Info text={result.data.message} />
        : null}
      {
        executions.map((execution, ix) => (
          <Log ix={ix} map={executionLogsMap(execution, ix)} />
        ))
      }
    </Page>
  )
}
