import quotes from '../data/quotes.json'
import {shuffle, getDerived} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}

const {script, minLimit, maxLimit, showFilters, showSidebar} = storage
const allQuotes = shuffle(storage.allQuotes || quotes)
const lang = storage.lang || 'ms'

const filter = q =>
  q[lang]
  && q[lang].length >= minLimit && q[lang].length <= maxLimit

const derived = (minLimit && maxLimit)
  ? getDerived(allQuotes, lang, filter)
  : getDerived(allQuotes, lang)

const {minLength, maxLength, allAuthors, filteredQuotes, filteredAuthors} = derived

export default {
  allQuotes,
  allAuthors,
  filteredQuotes,
  filteredAuthors,
  minLength,
  maxLength,
  lang,
  script: script || 'kir',
  showFilters,
  showSidebar,
  minLimit: minLimit || minLength,
  maxLimit: maxLimit || maxLength,
  selectedAuthors: new Set(),
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
}
