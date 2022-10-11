import React, { useEffect, useState } from 'react'
import Select from '../../components/atoms/Select'
import Textarea from '../../components/atoms/Textarea'
import Button from '../../components/atoms/Button'
import { getAll as getAllProblems } from '../../features/problems'
import { getAll as getAllLanguages } from '../../features/languages'
import { addingIntegersInCpp, initChannel, uniqueByKey } from '../../helpers'
import { commit } from '../../features/solutions'

export default function Commit() {
  const [problems, setProblems] = useState([])
  const [executions, setExecutions] = useState([])
  const [problem, setProblem] = useState()
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState()
  const [code, setCode] = useState(addingIntegersInCpp)
  const [commited, setCommited] = useState(false)
  const [result, setResult] = useState()

  useEffect(() => {
    initChannel('solution-tests-executions-updates', (data) => {
      // Some bug with pusher instance being replicated in memory
      // leads to initChannel being called 2 times so as long
      // as it won't be fixed, we should pick only distinct
      // executions objects from the list
      setExecutions(executions => uniqueByKey([...executions, data.execution], 'id'))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAllProblems(setProblems)
    getAllLanguages(setLanguages)
  }, [])

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
        executions.map((execution, ix)=> (
          <div key={ix}>⚫️ {execution.output}</div>
        ))
      }
    </div>
  )
}
