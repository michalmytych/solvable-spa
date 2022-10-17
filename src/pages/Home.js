import React from 'react'
import Page from '../components/atoms/Page'
import Header from '../components/atoms/Header'

export default function Home() {
  return (
    <Page>
      <Header text="Solvable" />
      <Header
        type="h3"
        text="Learn programming by solving interactive problems with your friends"
      />
    </Page>
  )
}
