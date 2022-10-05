import React, { useEffect, useState } from 'react'
import Select from '../../components/atoms/Select'
import { getAll as getAllProblems } from '../../features/problems'
import { getAll as getAllLanguages } from '../../features/languages'

export default function Commit() {
  const [problems, setProblems] = useState([])
  const [problem, setProblem] = useState()
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState()
  
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
    </div>
  )
}
