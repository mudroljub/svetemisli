import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Quote from './Quote'
import Pagionation from './Pagination'
import {useTranslate, useTransliterate, setPage} from '../../store/actions'
import {smoothscroll} from '../../utils/helpers'
import chakra from '../../assets/images/chakra.svg'
import './quotes.css'

const quotesPerPage = 15

export default function Quotes({quotes, hideImage}) {
  const {phrase, page} = useSelector(state => state)
  const translate = useTranslate()
  const transliterate = useTransliterate()
  const dispatch = useDispatch()

  const totalPages = Math.ceil(quotes.length / quotesPerPage)
  const startPosition = page * quotesPerPage

  useEffect(() => {
    if (page >= totalPages) dispatch(setPage(0))
  }, [page, totalPages, dispatch])

  const image = <img
    src={chakra}
    alt="cvět"
    key="cvět"
    width="250"
  />

  const addImgTo = arr => {
    arr.splice(Math.floor(quotesPerPage / 2), 0, image)
  }

  const setPageAndScroll = x => {
    dispatch(setPage(x))
    smoothscroll()
  }

  const jsxQuotes = quotes
    .filter((q, i) => i >= startPosition && i < startPosition + quotesPerPage)
    .map(q => <Quote key={q._id} quote={q} />)

  if (!hideImage) addImgTo(jsxQuotes)

  return (
    <div>
      {phrase && <small style={{ display: 'block', marginBottom: '10px'}}>{translate('SHOWING_RESULTS')} "{transliterate(phrase)}":</small>}
      <div className='citati'>
        {jsxQuotes}
      </div>
      {totalPages > 1 && (
        <Pagionation totalPages={totalPages} page={page} setPage={setPageAndScroll} />
      )}
    </div>
  )
}
