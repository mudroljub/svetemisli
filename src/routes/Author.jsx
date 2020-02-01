import React from 'react'
import {useSelector} from 'react-redux'

import Quotes from '../components/main/Quotes'
import AuthorImage from '../components/main/AuthorImage'
import AuthorInfo from '../components/main/AuthorInfo'
import {useAuthorName} from '../store/actions'
import {isLang, includes} from '../utils/helpers'

const Author = ({match}) => {
  const {allQuotes, lang, phrase, translationMode} = useSelector(state => state)
  const getName = useAuthorName()

  const author = match.params.name.replace(/_/g, ' ')
  const filtered = allQuotes.filter(q =>
    isLang(q, lang, translationMode)
    && q.author === author
    && (phrase ? includes(q[lang], phrase) : true)
  )

  return (
    <main>
      <h1>{getName(author)}</h1>
      <div className="author-info">
        <h3 className="hide-sm">{getName(author)}</h3>
        <AuthorImage author={author} showImage={true} />
        <AuthorInfo author={author} />
      </div>
      <Quotes quotes={filtered} />
    </main>
  )
}

export default Author
