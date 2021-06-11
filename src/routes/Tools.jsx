/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import {useSelector} from 'react-redux'

import {useTranslate} from '../store/actions'
import {download} from '../utils/helpers'

const Tools = () => {
  const translate = useTranslate()
  const {allQuotes} = useSelector(state => state)

  const saveFile = () => {
    download(JSON.stringify(allQuotes, null, 2), 'citati.json', 'text/plain')
  }

  const deleteStorage = () => {
    localStorage.clear()
  }

  return (
    <main>
      <h1>{translate('TOOLS')}</h1>
      <button onClick={saveFile}>💾 Export quotes</button>
      <p>
        Export all quotes, together with your edits, as a json file.
      </p>
      <button onClick={deleteStorage}>❌ Delete local storage</button>
      <p>
        Delete all your user setting, together with modified quotes.
      </p>
    </main>
  )
}

export default Tools
