/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import {useTranslate} from '../store/actions'
import {download} from '../utils/helpers'

const Tools = () => {
  const translate = useTranslate()
  const {allQuotes, favorites} = useSelector(state => state)

  const saveFile = () => {
    const sorted = [...allQuotes].sort((a, b) => a._id - b._id)
    download(JSON.stringify(sorted, null, 2), 'quotes.json', 'text/plain')
  }

  const saveFavorites = () => {
    download(JSON.stringify(favorites), 'favorites.json', 'text/plain')
  }

  const deleteStorage = () => {
    localStorage.clear()
    caches.keys().then(keys => keys.forEach(c => caches.delete(c)))
  }

  return (
    <main>
      <h1>{translate('TOOLS')}</h1>
      <p>
        <Link to={'/statistika'}>{translate('STATISTICS')}</Link>&nbsp;
      </p>
      <p>
        <Link to={'/favorites'}>{translate('FAVORITES')}</Link>&nbsp;
      </p>
      <button onClick={saveFile}>💾 Export quotes</button>
      <p>
        Export all quotes, together with your edits, as a json file.
      </p>
      <button onClick={saveFavorites}>⭐ Export favorites</button>
      <p>
        Export your favorite quotes.
      </p>
      <button onClick={deleteStorage}>❌ Delete local storage</button>
      <p>
        Delete all your user setting, together with modified quotes.
      </p>
    </main>
  )
}

export default Tools
