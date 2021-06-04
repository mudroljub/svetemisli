import {includes, getDerived, getName, isInText, isInSource} from '../utils/helpers'
import initialState from './initialState'

export const reducer = (state = initialState, action) => {
  const {allQuotes, allAuthors, selectedAuthors, lang, phrase, authorPhrase, sourcePhrase, minLimit, maxLimit} = state
  const {quote} = action

  const filterQ = q =>
    q[lang]
    && isInText(q[lang], phrase)
    && isInSource(q.source, sourcePhrase)
    && (selectedAuthors.size ? selectedAuthors.has(q.author) : true)
    && q[lang].length >= minLimit && q[lang].length <= maxLimit

  switch (action.type) {
    case 'INIT': {
      const {minLength, maxLength, filteredQuotes, filteredAuthors} = getDerived(allQuotes, lang, filterQ)
      return {
        ...state,
        filteredQuotes,
        filteredAuthors,
        minLength,
        maxLength,
        minLimit: minLimit >= minLength ? minLimit : minLength,
        maxLimit: maxLimit <= maxLength ? maxLimit : maxLength,
      }
    }
    case 'FILTER_QUOTES':
      return {
        ...state,
        filteredQuotes: allQuotes.filter(filterQ)
      }
    case 'SET_LANGUAGE':
      return {...state, lang: action.lang}
    case 'SET_SCRIPT':
      return {...state, script: action.script }
    case 'SET_PHRASE':
      return {...state, phrase: action.phrase }
    case 'SET_AUTHOR_PHRASE':
      return {...state, authorPhrase: action.authorPhrase }
    case 'SET_SOURCE_PHRASE':
      return {...state, sourcePhrase: action.sourcePhrase }
    case 'SET_MIN_LIMIT':
      return {...state, minLimit: action.minLimit }
    case 'SET_MAX_LIMIT':
      return {...state, maxLimit: action.maxLimit }
    case 'SET_SHOW_SIDEBAR':
      return {...state, showSidebar: action.showSidebar }
    case 'SET_SHOW_FILTERS':
      return {...state, showFilters: action.showFilters }
    case 'ADD_QUOTE': {
      const updatedQuotes = [...allQuotes, quote]
      return {
        ...state,
        allQuotes: updatedQuotes,
        filteredQuotes: updatedQuotes.filter(filterQ),
        allAuthors: allAuthors.add(quote.author)
      }
    }
    case 'UPDATE_QUOTE': {
      const updatedQuotes = allQuotes.map(q => q._id === quote._id ? quote : q)
      return {
        ...state,
        allQuotes: updatedQuotes,
        filteredQuotes: updatedQuotes.filter(filterQ)
      }
    }
    case 'DELETE_QUOTE': {
      const updatedQuotes = allQuotes.filter(q => q._id !== action._id)
      return {
        ...state,
        allQuotes: updatedQuotes,
        filteredQuotes: updatedQuotes.filter(filterQ)
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
