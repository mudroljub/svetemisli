import React from 'react'
import {useSelector} from 'react-redux'

import {useTranslate} from '../store/actions'
import Quotes from '../components/main/Quotes'

const Favorites = () => {
  const {allQuotes, favorites} = useSelector(state => state)
  const translate = useTranslate()

  const filtered = allQuotes.filter(q => favorites.includes(q._id))

  return (
    <main>
      <h1>{translate('FAVORITES')}</h1>
      <Quotes quotes={filtered} />
    </main>
  )
}

export default Favorites
