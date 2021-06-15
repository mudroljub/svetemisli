import quotes from '../data/quotes.json'
import savedFavorites from '../data/favorites.json'
import {shuffle, getDerived} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}
// required storage props for derived
storage.lang = storage.lang || 'ms'
storage.allQuotes = storage.allQuotes || shuffle(quotes)

const {lang, script = 'kir', minLimit, maxLimit, showFilters = false, showSidebar = false, phrase = '', sourcePhrase = '', authorPhrase = '', selectedAuthors = [], allQuotes, page = 0, favorites = savedFavorites} = storage

const {minLength, maxLength, allAuthors, filteredQuotes, filteredAuthors} = getDerived(storage)

const initialState = {
  allQuotes,
  allAuthors,
  filteredQuotes,
  filteredAuthors,
  minLength,
  maxLength,
  lang,
  script,
  selectedAuthors,
  phrase,
  authorPhrase,
  sourcePhrase,
  page,
  favorites,
  showFilters,
  showSidebar,
  minLimit: minLimit || minLength,
  maxLimit: maxLimit || maxLength,
}

export default initialState