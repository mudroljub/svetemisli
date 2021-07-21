import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterQuotes, filterAuthors, useTranslate, setPhrase, setAuthorPhrase, setSourcePhrase, setMinLimit, setMaxLimit, setShowFilters } from '../../store/actions'

const Filters = () => {
  const { phrase, authorPhrase, sourcePhrase, minLength, maxLength, minLimit, maxLimit, showFilters } = useSelector(state => state)
  const translate = useTranslate()
  const dispatch = useDispatch()

  const changePhrase = e => {
    dispatch(setPhrase(e.target.value))
    dispatch(filterQuotes())
  }

  const changeAuthorPhrase = e => {
    dispatch(setAuthorPhrase(e.target.value))
    dispatch(filterAuthors())
  }

  const changeSourcePhrase = e => {
    dispatch(setSourcePhrase(e.target.value))
    dispatch(filterQuotes())
  }

  const toggleMoreFilters = () => {
    dispatch(setShowFilters(!showFilters))
  }

  const changeMinLimit = e => {
    dispatch(setMinLimit(e.target.value))
    dispatch(filterQuotes())
  }

  const changeMaxLimit = e => {
    dispatch(setMaxLimit(e.target.value))
    dispatch(filterQuotes())
  }

  return (
    <div className="filters">
      <h3><label htmlFor="izreke">{translate('SEARCH_QUOTES')}</label></h3>
      <input id="izreke" value={phrase} onChange={changePhrase} />

      <h3><label htmlFor="avtori">{translate('SEARCH_AUTHORS')}</label></h3>
      <input id="avtori" value={authorPhrase} onChange={changeAuthorPhrase} />

      <div style={{textAlign: 'right'}} >
        <span onClick={toggleMoreFilters} style={{cursor: 'pointer'}}>⚙</span>
      </div>
      {showFilters &&
        <div>
          <h3><label htmlFor="izvori">{translate('FILTER_BY_SOURCE')}</label></h3>
          <input id="izvori"
            value={sourcePhrase}
            onChange={changeSourcePhrase}
          />

          <h3>{translate('FILTER_BY_LENGTH')}</h3>
          <div>
            <label htmlFor="min">Min ({minLimit})</label>
            <input
              id="min"
              type="range"
              min={minLength}
              max={maxLength}
              value={minLimit}
              onChange={changeMinLimit}
            />
          </div>
          <div>
            <label htmlFor="max">Max ({maxLimit})</label>
            <input
              id="max"
              type="range"
              min={minLength}
              max={maxLength}
              value={maxLimit}
              onChange={changeMaxLimit}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default Filters