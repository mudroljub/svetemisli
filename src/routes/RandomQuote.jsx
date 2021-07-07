import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import ImageQuote from './../components/main/ImageQuote'
import {useTranslate, setIndex} from '../store/actions'
import {smoothscroll} from '../utils/helpers'

const RandomQuote = () => {
  const {filteredQuotes, i} = useSelector(state => state)
  const translate = useTranslate()
  const dispatch = useDispatch()
  const quote = filteredQuotes[i]

  const next = () => {
    dispatch(setIndex((i + 1) % filteredQuotes.length))
    smoothscroll()
  }

  const prev = () => {
    if (i - 1 < 0) return
    dispatch(setIndex(i - 1))
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
