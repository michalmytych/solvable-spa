import React, { useEffect, useState } from 'react'
import Select from '../../components/atoms/Select'
import Textarea from '../../components/atoms/Textarea'
import { getAll as getAllProblems } from '../../features/problems'
import { getAll as getAllLanguages } from '../../features/languages'
import { addingIntegersInCpp } from '../../helpers'

export default function Commit() {
  const [problems, setProblems] = useState([])
  const [problem, setProblem] = useState()
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState()
  const [code, setCode] = useState(addingIntegersInCpp)
  
  useEffect(() => {
    getAllProblems(setProblems)
    getAllLanguages(setLanguages)
  }, [])

  return (
    <div>
      <h1>Commit a solution</h1>
      <div>{problem ? problem.title : 'Select problem'}</div>
      <Select items={problems.data} _key={'title'} onSelect={setProblem}></Select>
      <div>{language ? language.name : 'Select language'}</div>
      <Select items={languages} onSelect={setLanguage}></Select>
      <hr/>
      <Textarea value={code} onChangeHandler={setCode}/>
    </div>
  )
}
