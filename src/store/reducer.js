import quotes from '../data/quotes.json'
import {LS} from '../config/localstorage'
import {includes, shuffle, getName, compare, isLang, isInText, isInSource} from '../utils/helpers'

const defaultLang = localStorage.getItem(LS.lang) || 'ms'

const sortAbc = (a, b) => compare(getName(a, defaultLang), getName(b, defaultLang))

shuffle(quotes)
const allAuthors = new Set()
quotes.forEach(q => allAuthors.add(q.author))

const filteredQuotes = quotes.filter(q => isLang(q, defaultLang))
const filteredAuthors = new Set()
filteredQuotes.forEach(q => filteredAuthors.add(q.author))

const initialState = {
  allQuotes: quotes,
  filteredQuotes,
  allAuthors: new Set([...allAuthors].sort(sortAbc)),
  filteredAuthors: [...filteredAuthors].sort(sortAbc), // shown in sidebar
  selectedAuthors: new Set(), // selected from sidebar
  admin: localStorage.getItem(LS.admin) === 'true',
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
  isFetching: false,
  lang: defaultLang,
  script: localStorage.getItem(LS.script) || 'kir',
  token: localStorage.getItem(LS.token),
  devMode: localStorage.getItem(LS.devMode) === 'true', // to boolean
  translationMode: localStorage.getItem(LS.translationMode) === 'true',
  offlineMode: localStorage.getItem(LS.offlineMode) === 'true',
}

export const reducer = (state = initialState, action) => {
  const {allQuotes, allAuthors, selectedAuthors, lang, translationMode, phrase, authorPhrase, sourcePhrase} = state
  const {quote} = action

  const sortAbc = (a, b) => compare(getName(a, lang), getName(b, lang))

  const filterQ = q =>
    isLang(q, lang, translationMode)
    && isInText(q[lang], phrase)
    && isInSource(q.source, sourcePhrase)
    && (selectedAuthors.size ? selectedAuthors.has(q.author) : true)

  switch (action.type) {
    case 'FETCH_QUOTES_REQUEST':
      return {...state, isFetching: true }
    case 'FETCH_QUOTES_SUCCESS': {
      const allAuthors = new Set()
      action.quotes.forEach(q => allAuthors.add(q.author))
      shuffle(action.quotes)
      return {
        ...state,
        isFetching: false,
        allQuotes: action.quotes,
        allAuthors: new Set([...allAuthors].sort(sortAbc)),
      }
    }
    case 'FETCH_QUOTES_FAILURE':
      return {
        ...state,
        isFetching: false,
      }
    case 'INIT': {
      const filteredQuotes = allQuotes.filter(filterQ)
      const filteredAuthors = new Set()
      filteredQuotes.forEach(q => filteredAuthors.add(q.author))
      return {
        ...state,
        filteredQuotes,
        filteredAuthors: [...filteredAuthors].sort(sortAbc)
      }
    }
    case 'FILTER_QUOTES': {
      return {
        ...state,
        filteredQuotes: allQuotes.filter(filterQ)
      }
    }
    case 'SET_LANGUAGE':
      return {...state, lang: action.lang}
    case 'SET_SCRIPT':
      return {...state, script: action.script }
    case 'SET_TOKEN':
      return {...state, token: action.token }
    case 'SET_ADMIN':
      return {...state, admin: action.admin }
    case 'SET_PHRASE':
      return {...state, phrase: action.phrase }
    case 'SET_AUTHOR_PHRASE':
      return {...state, authorPhrase: action.authorPhrase }
    case 'SET_SOURCE_PHRASE':
      return {...state, sourcePhrase: action.sourcePhrase }
    case 'SET_TRANSLATION_MODE':
      return {...state, translationMode: action.translationMode }
    case 'SET_DEV_MODE':
      return {...state, devMode: action.devMode }
    case 'SET_OFFLINE_MODE':
      return {...state, offlineMode: action.offlineMode }
    case 'ADD_QUOTE':
      return {
        ...state,
        allQuotes: [...allQuotes, quote],
        filteredQuotes: allQuotes.filter(filterQ),
        allAuthors: allAuthors.add(quote.author)
      }
    case 'UPDATE_QUOTE': {
      const newQuotes = allQuotes.map(q => q._id === quote._id ? quote : q)
      return {
        ...state,
        allQuotes: newQuotes,
        filteredQuotes: newQuotes.filter(filterQ)
      }
    }
    case 'DELETE_QUOTE': {
      const newQuotes = allQuotes.filter(q => q._id !== action._id)
      return {
        ...state,
        allQuotes: newQuotes,
        filteredQuotes: newQuotes.filter(filterQ)
      }
    }
    case 'FILTER_AUTHORS': {
      const filteredAuthors = [...allAuthors]
        .filter(name => includes(name, authorPhrase) || includes(getName(name, lang), authorPhrase))
      return {
        ...state,
        filteredAuthors
      }
    }
    case 'TOGGLE_SELECTED_AUTHORS': {
      const {shouldAdd, value} = action
      const authors = new Set([...selectedAuthors])
      if (shouldAdd) authors.add(value)
      else authors.delete(value)
      return {
        ...state,
        selectedAuthors: authors
      }
    }
    default:
      return state
  }
}
