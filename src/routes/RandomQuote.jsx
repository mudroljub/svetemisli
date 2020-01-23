import React, { useState } from 'react'
import {useSelector} from 'react-redux'

import ImageQuote from './../components/main/ImageQuote'
import {useTranslate} from '../store/actions'
import {smoothscroll} from '../utils/helpers'

const getRandom = filteredQuotes =>
  filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]

const RandomQuote = () => {
  const {filteredQuotes} = useSelector(state => state)
  const translate = useTranslate()
  const [quote, setQuote] = useState(getRandom(filteredQuotes))

  const setRandom = () => {
    setQuote(getRandom(filteredQuotes))
    smoothscroll()
  }

  if (!quote) return null

  return (
    <main>
      <h1>{translate('QUOTE_OF_THE_DAY')}</h1>
      <ImageQuote quote={quote} cssClass="big-quote" />
      <button onClick={setRandom}>{translate('MORE_WISDOM')}</button>
    </main>
  )
}

export default RandomQuote
