import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {API} from '../config/api'
import ImageQuote from './../components/main/ImageQuote'
import {useTranslate} from '../store/actions'
import preloader from '../assets/images/preloader.svg'
import {getSavedQuote} from '../utils/helpers'

const ShowQuote = ({match}) => {
  const {id} = match.params
  const {allQuotes, offlineMode} = useSelector(state => state)
  const [quote, setQuote] = useState(allQuotes.find(q => q._id === id))
  const translate = useTranslate()

  const savedQuote = offlineMode ? getSavedQuote(id) : null

  useEffect(() => {
    if (savedQuote || quote) return
    fetch(`${API.read}/id/${id}`)
      .then(res => res.json())
      .then(quote => setQuote(quote))
  }, [id, quote, savedQuote])

  if (!quote) return <img src={preloader} alt="loading..." />

  return (
    <main>
      <ImageQuote quote={savedQuote || quote} showSource={true} cssClass="big-quote" />
      <Link to="/" replace>{translate('BACK')}</Link>
    </main>
  )
}

export default ShowQuote
