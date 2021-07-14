import React from 'react'
import {useSelector} from 'react-redux'

import {useTranslate} from '../store/actions'
import Quotes from '../components/main/Quotes'
import {isInSource} from '../utils/helpers'

const Untranslated = () => {
  const {allQuotes, lang, sourcePhrase, selectedAuthors} = useSelector(state => state)
  const translate = useTranslate()

  const filterQuotes = q => !q[lang]
      && isInSource(q.source, sourcePhrase)
      && (selectedAuthors && selectedAuthors.length ? selectedAuthors.includes(q.author) : true)

  const untranslated = allQuotes.filter(filterQuotes)

  return (
    <main>
      <h1>{translate('UNTRANSLATED')}</h1>
      {untranslated.length ? <Quotes quotes={untranslated} /> : translate('NO_UNTRANSLATED')}
    </main>
  )
}

export default Untranslated