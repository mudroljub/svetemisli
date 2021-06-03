import quotes from '../data/quotes.json'
import {shuffle, getDerived, getName, compare} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}

const allQuotes = storage.allQuotes || shuffle(quotes)
const lang = storage.lang || 'ms'

const sortAbc = (a, b) => compare(getName(a, lang), getName(b, lang))

const {minLength, maxLength, allAuthors, filteredQuotes, filteredAuthors} = getDerived(allQuotes, lang)

export default {
  allQuotes,
  filteredQuotes,
  allAuthors: new Set([...allAuthors].sort(sortAbc)),
  filteredAuthors: [...filteredAuthors].sort(sortAbc), // shown in sidebar
  selectedAuthors: new Set(), // selected from sidebar
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
  lang,
  script: storage.script || 'kir',
  minLength,
  maxLength,
  minLimit: minLength,
  maxLimit: maxLength,
}
