import React from 'react'
import {useSelector} from 'react-redux'

import Quotes from '../components/main/Quotes'
import AuthorImage from '../components/main/AuthorImage'
import AuthorInfo from '../components/main/AuthorInfo'
import {useAuthorName} from '../store/actions'
import {isInText, isInSource} from '../utils/helpers'

const Author = ({match}) => {
  const {allQuotes, lang, phrase, sourcePhrase} = useSelector(state => state)
  const getName = useAuthorName()

  const author = match.params.name.replace(/_/g, ' ')

  const filtered = allQuotes.filter(q =>
    q[lang]
    && isInText(q[lang], phrase)
    && isInSource(q.source, sourcePhrase)
    && q.author === author
  )

  return (
    <main>
      <h1>{getName(author)}</h1>
      <div className="author-info">
        <h3 className="hide-sm">{getName(author)}</h3>
        <AuthorImage author={author} showImage={true} />
        <AuthorInfo author={author} />
      </div>
      <Quotes quotes={filtered} hideImage />
    </main>
  )
}

export default Author
