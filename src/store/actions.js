import { useSelector } from 'react-redux'

import translations from '../data/translations'
import {getName, createId} from '../utils/helpers'
import transliterate from '../utils/transliterate'

export const init = () => ({type: 'INIT'})

export const setLang = lang => ({ type: 'SET_LANGUAGE', lang })

export const setScript = script => ({ type: 'SET_SCRIPT', script })

export const addQuote = quote => ({type: 'ADD_QUOTE', quote})

export const updateQuote = quote => ({type: 'UPDATE_QUOTE', quote})

export const deleteQuote = _id => ({type: 'DELETE_QUOTE', _id})

export const filterAuthors = () => ({type: 'FILTER_AUTHORS'})

export const filterQuotes = () => ({type: 'FILTER_QUOTES'})

export const toggleSelectedAuthors = (shouldAdd, value) => ({type: 'TOGGLE_SELECTED_AUTHORS', shouldAdd, value})

export const setPhrase = phrase => ({type: 'SET_PHRASE', phrase})

export const setAuthorPhrase = authorPhrase => ({type: 'SET_AUTHOR_PHRASE', authorPhrase})

export const setSourcePhrase = sourcePhrase => ({type: 'SET_SOURCE_PHRASE', sourcePhrase})

export const setMinLimit = minLimit => ({type: 'SET_MIN_LIMIT', minLimit})

export const setMaxLimit = maxLimit => ({type: 'SET_MAX_LIMIT', maxLimit})

export const setShowFilters = showFilters => ({type: 'SET_SHOW_FILTERS', showFilters})

export const setShowSidebar = showSidebar => ({type: 'SET_SHOW_SIDEBAR', showSidebar})

export const saveQuote = obj => (dispatch, getState) => {
  const action = obj._id ? updateQuote : addQuote
  if (!obj._id) obj._id = createId(getState().allQuotes)
  dispatch(action(obj))
  // TODO: SUCCESS_SAVED
  return obj._id
}

/* SELECTORS */

export const useTranslate = () => {
  const {lang, script} = useSelector(state => state)
  return key => (translations[lang][key])
    ? transliterate(translations[lang][key], script, lang)
    : key
}

export const useTransliterate = () => {
  const {lang, script} = useSelector(state => state)
  return text => transliterate(text, script, lang)
}

export const useAuthorName = () => {
  const { script, lang } = useSelector(state => state)
  return author => {
    const name = getName(author, lang)
    return transliterate(name, script, lang)
  }
}