import React from 'react'
import {useSelector} from 'react-redux'

// import {useTranslate} from '../store/actions'

const ShowQuote = () => {
  const {allQuotes} = useSelector(state => state)
  // const translate = useTranslate()
  console.log(allQuotes)

  return (
    <main>
      <h1>Statistika</h1>
    </main>
  )
}

export default ShowQuote
