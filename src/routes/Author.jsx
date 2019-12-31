import React from 'react'
import {connect} from 'react-redux'

import Quotes from '../components/main/Quotes'
import AuthorBox from '../components/main/AuthorBox'
import {useTranslate} from '../store/actions'

const Author = props => {
  const translate = useTranslate()
  const {lang, allQuotes, phrase, match} = props
  const author = match.params.name.replace(/_/g, ' ')

  const filtered = allQuotes
    .filter(q => q.author === author && q[lang] && q[lang].toLowerCase().includes(phrase.toLowerCase()))
    .sort(() => 0.5 - Math.random())

  return (
    <main>
      <h1>{author}</h1>
      <AuthorBox author={author} />
      {phrase && <small>{translate('SHOWING_RESULTS')} "{phrase}":</small>}
      <Quotes loaded={allQuotes.length} currentQuotes={filtered} />
    </main>
  )
}

const mapStateToProps = ({lang, allQuotes, phrase}) => ({lang, allQuotes, phrase})

export default connect(mapStateToProps)(Author)
