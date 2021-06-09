import quotes from '../data/quotes.json'
import {shuffle, getDerived, isInText, isInSource} from '../utils/helpers'

const storage = localStorage.getItem('sveteMisli')
  ? JSON.parse(localStorage.getItem('sveteMisli'))
  : {}

const {script, minLimit, maxLimit, showFilters, showSidebar, phrase, sourcePhrase, authorPhrase, selectedAuthors} = storage
const allQuotes = shuffle(storage.allQuotes || quotes)
const lang = storage.lang || 'ms'

const filter = q =>
  q[lang]
  && isInText(q[lang], phrase)
  && isInSource(q.source, sourcePhrase)
  && (selectedAuthors.length ? selectedAuthors.includes(q.author) : true)
  && q[lang].length >= minLimit && q[lang].length <= maxLimit

// TODO: fix logic
const derived = (minLimit && maxLimit)
  ? getDerived(allQuotes, lang, filter, authorPhrase)
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
  showFilters: showFilters || false,
  showSidebar: showSidebar || false,
  minLimit: minLimit || minLength,
  maxLimit: maxLimit || maxLength,
  selectedAuthors: selectedAuthors || [],
  phrase: phrase || '',
  authorPhrase: authorPhrase || '',
  sourcePhrase: sourcePhrase || '',
}
