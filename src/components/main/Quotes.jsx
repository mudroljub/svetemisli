import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import Quote from './Quote'
import Pagionation from './Pagination'
import preloader from '../../assets/images/preloader.svg'
import {useTranslate, useTransliterate} from '../../store/actions'
import {smoothscroll} from '../../utils/helpers'
import './quotes.css'

const quotesPerPage = 15

export default function Quotes({quotes}) {
  const {isFetching, phrase} = useSelector(state => state)
  const translate = useTranslate()
  const transliterate = useTransliterate()
  const [page, setPage] = useState(0)

  if (isFetching) return <img src={preloader} alt="loading..." />

  const setPageAndScroll = x => {
    setPage(x)
    smoothscroll()
  }

  const totalPages = Math.ceil(quotes.length / quotesPerPage)
  const startPosition = page * quotesPerPage

  const mappedQuotes = quotes
    .filter((q, i) => i >= startPosition && i < startPosition + quotesPerPage)
    .map(q => <Quote key={q._id} quote={q} />)

  return (
    <main>
      {phrase && <small>{translate('SHOWING_RESULTS')} "{transliterate(phrase)}":</small>}
      <div className='citati'>
        {mappedQuotes}
      </div>
      {totalPages > 1 && (
        <Pagionation totalPages={totalPages} page={page} setPage={setPageAndScroll} />
      )}
    </main>
  )
}
