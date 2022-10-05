import React, { useEffect, useState } from 'react'
import Select from '../../components/atoms/Select'
import Textarea from '../../components/atoms/Textarea'
import Button from '../../components/atoms/Button'
import { getAll as getAllProblems } from '../../features/problems'
import { getAll as getAllLanguages } from '../../features/languages'
import { addingIntegersInCpp } from '../../helpers'
import { commit } from '../../features/solutions'

export default function Commit() {
  const [problems, setProblems] = useState([])
  const [problem, setProblem] = useState()
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState()
  const [code, setCode] = useState(addingIntegersInCpp)
  const [commited, setCommited] = useState(false)

  useEffect(() => {
    getAllProblems(setProblems)
    getAllLanguages(setLanguages)
  }, [])

  useEffect(() => {
    async function postData(data) {
      if (commited) {
        return commit(data)
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
      <Select items={problems.data} _key={'title'} onSelect={setProblem}></Select>
      <h5>{language ? language.name : 'Select language'}</h5>
      <Select items={languages} onSelect={setLanguage}></Select>
      <h5>Write down your solution</h5>
      <Textarea value={code} onChangeHandler={setCode} />
      <Button text='Save' onClickHandler={() => setCommited(true)} />
    </div>
  )
}
