import { useSelector } from 'react-redux'

import translations from '../data/translations'
import {getName} from '../utils/helpers'
import transliterate from '../utils/transliterate'
import {LS} from '../config/localstorage'

export const init = () => ({type: 'INIT'})

export const setLang = lang => {
  localStorage.setItem(LS.lang, lang)
  return { type: 'SET_LANGUAGE', lang }
}

export const setScript = script => {
  localStorage.setItem(LS.script, script)
  return { type: 'SET_SCRIPT', script }
}

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

export const sendQuote = obj => dispatch => {
  const action = obj._id ? updateQuote : addQuote
  dispatch(action(obj))
  return obj._id  || null // dodeljivati id
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