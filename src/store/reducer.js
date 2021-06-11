import {getDerived, filterQuotes, showAuthor} from '../utils/helpers'
import initialState from './initialState'

export const reducer = (state = initialState, action) => {
  const {allQuotes, allAuthors, selectedAuthors, lang, authorPhrase} = state
  const {quote} = action

  const filterQ = q => filterQuotes(q, state)

  switch (action.type) {
    case 'INIT': {
      const {minLength, maxLength, filteredQuotes, filteredAuthors} = getDerived(state)
      return {
        ...state,
        filteredQuotes,
        filteredAuthors,
        minLength,
        maxLength,
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
    case 'SET_PAGE':
      return {...state, page: action.page }
    case 'ADD_QUOTE': {
      const updatedQuotes = [...allQuotes, quote]
      return {
        ...state,
        allQuotes: updatedQuotes,
        filteredQuotes: updatedQuotes.filter(filterQ),
        allAuthors: !allAuthors.includes(quote.author) ? [...allAuthors, quote.author] : allAuthors
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
      const filteredAuthors = allAuthors.filter(name => showAuthor(name, lang, authorPhrase))
      return {
        ...state,
        filteredAuthors
      }
    }
    case 'TOGGLE_SELECTED_AUTHORS': {
      const {shouldAdd, value} = action
      return {
        ...state,
        selectedAuthors: shouldAdd ? [...selectedAuthors, value] : selectedAuthors.filter(a => a !== value)
      }
    }
    default:
      return state
  }
}
