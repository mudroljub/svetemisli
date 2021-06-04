import quotes from '../data/quotes.json'
import {shuffle, getDerived} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}

console.log(storage)

const allQuotes = storage.allQuotes || shuffle(quotes)
const lang = storage.lang || 'ms'

const {minLength, maxLength, allAuthors, filteredQuotes, filteredAuthors} = getDerived(allQuotes, lang)

export default {
  allQuotes,
  allAuthors,
  filteredQuotes,
  filteredAuthors, // shown in sidebar
  minLength,
  maxLength,
  lang,
  script: storage.script || 'kir',
  showFilters: storage.showFilters === 'true',
  showSidebar: storage.showSidebar === 'true',
  minLimit: minLength,
  maxLimit: maxLength,
  selectedAuthors: new Set(), // selected from sidebar
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
}
