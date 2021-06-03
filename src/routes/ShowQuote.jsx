import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import ImageQuote from './../components/main/ImageQuote'
import {useTranslate} from '../store/actions'

const ShowQuote = ({match}) => {
  const {id} = match.params
  const {allQuotes} = useSelector(state => state)
  const quote = allQuotes.find(q => q._id === Number(id))
  const translate = useTranslate()

  return (
    <main>
      <ImageQuote quote={quote} showSource={true} cssClass="big-quote" />
      <Link to="/" replace>{translate('BACK')}</Link>
    </main>
  )
}

export default ShowQuote
