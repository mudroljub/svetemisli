import quotes from '../data/quotes.json'
import {shuffle, getDerived} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}

const allQuotes = shuffle(storage.allQuotes || quotes)
const lang = storage.lang || 'ms'

const {minLength, maxLength, allAuthors, filteredQuotes, filteredAuthors} = getDerived(allQuotes, lang)

export default {
  allQuotes,
  allAuthors,
  filteredQuotes,
  filteredAuthors,
  minLength,
  maxLength,
  lang,
  script: storage.script || 'kir',
  showFilters: storage.showFilters,
  showSidebar: storage.showSidebar,
  minLimit: storage.minLimit || minLength,
  maxLimit: storage.maxLimit || maxLength,
  selectedAuthors: new Set(),
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
}
