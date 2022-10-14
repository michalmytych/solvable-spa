import React, { useEffect, useState } from 'react'
import Select from '../../components/atoms/Select'
import Textarea from '../../components/atoms/Textarea'
import Button from '../../components/atoms/Button'
import { getAll as getAllProblems } from '../../features/problems'
import { getAll as getAllLanguages } from '../../features/languages'
import { addingIntegersInCpp, initChannel, uniqueByKey } from '../../helpers'
import { commit } from '../../features/solutions'
import Log from '../../components/atoms/Log'
import Moment from 'moment'

export default function Commit({ alertSetter }) {
  const [problems, setProblems] = useState([])
  const [executions, setExecutions] = useState([])
  const [problem, setProblem] = useState()
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState()
  const [code, setCode] = useState(addingIntegersInCpp)
  const [commited, setCommited] = useState(false)
  const [result, setResult] = useState()

  useEffect(() => {
    initChannel('solution-tests-executions-updates', [
      {
        event: 'executed-new-solution-test',
        // Some bug with pusher instance being replicated in memory
        // leads to initChannel being called 2 times so as long
        // as it won't be fixed, we should pick only distinct
        // executions objects from the list
        action: (data) => setExecutions(executions => uniqueByKey([...executions, data.execution], 'id'))
      },
      {
        event: 'finished-new-solution-testing',
        action: (data) => alert('Zakończono')
      }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAllProblems(setProblems, alertSetter)
    getAllLanguages(setLanguages, alertSetter)
  }, [alertSetter])

  useEffect(() => {
    async function postData(data) {
      if (commited) {
        return commit(data, setResult, alertSetter)
      }
    }
    postData({
      code: code,
      problem: problem,
      language: language,
    })
  }, [alertSetter, code, commited, language, problem])

  return (
    <div>
      <h1>Commit a solution</h1>
      <h5>{problem ? problem.title : 'Select problem'}</h5>
      <Select
        items={problems.data}
        _key={'title'}
        onSelect={setProblem}
        disabled={commited}
      />
      <h5>{language ? language.name : 'Select language'}</h5>
      <Select
        items={languages}
        onSelect={setLanguage}
        disabled={commited}
      />
      <h5>Write down your solution</h5>
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
      {result ? <h4>{result.data.message}</h4> : null}
      {
        executions.map((execution, ix) => (
          <Log
            ix={ix}
            map={{
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
            }}
          />
        ))
      }
    </div>
  )
}
