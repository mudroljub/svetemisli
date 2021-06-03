import quotes from '../data/quotes.json'
import {shuffle, getDerived, getName, compare} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}

const defaultLang = storage.lang || 'ms'

const sortAbc = (a, b) => compare(getName(a, defaultLang), getName(b, defaultLang))

shuffle(quotes)

const {minLength, maxLength, allAuthors} = getDerived(quotes, defaultLang)
const filteredQuotes = quotes.filter(q => q[defaultLang])
const filteredAuthors = new Set() // lang authors
filteredQuotes.forEach(q => filteredAuthors.add(q.author))

export default {
  allQuotes: quotes,
  filteredQuotes,
  allAuthors: new Set([...allAuthors].sort(sortAbc)),
  filteredAuthors: [...filteredAuthors].sort(sortAbc), // shown in sidebar
  selectedAuthors: new Set(), // selected from sidebar
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
  lang: defaultLang,
  script: storage.script || 'kir',
  minLength,
  maxLength,
  minLimit: minLength,
  maxLimit: maxLength,
}
