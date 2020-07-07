import React, { useState } from 'react'
import {useSelector} from 'react-redux'

import ImageQuote from './../components/main/ImageQuote'
import {useTranslate} from '../store/actions'
import {smoothscroll} from '../utils/helpers'

let i = 0

const RandomQuote = () => {
  const {filteredQuotes} = useSelector(state => state)
  const translate = useTranslate()
  const [quote, setQuote] = useState(filteredQuotes[i])

  const next = () => {
    setQuote(filteredQuotes[++i % filteredQuotes.length])
    smoothscroll()
  }

  const prev = () => {
    if (i - 1 < 0) return
    setQuote(filteredQuotes[--i])
    smoothscroll()
  }

  if (!quote) return null

  return (
    <main>
      <h1>{translate('QUOTE_OF_THE_DAY')}</h1>
      <ImageQuote quote={quote} cssClass="big-quote" />
      {i > 0 && <button onClick={prev}>←</button>}
      <button onClick={next}>{translate('MORE_WISDOM')}</button>
    </main>
  )
}

export default RandomQuote
