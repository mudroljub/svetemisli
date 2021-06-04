import React from 'react'
import {useSelector} from 'react-redux'

import {useTranslate} from '../store/actions'
import {download} from '../utils/helpers'

const Tools = () => {
  const translate = useTranslate()
  const {allQuotes} = useSelector(state => state)

  const saveFile = () => {
    download(JSON.stringify(allQuotes), 'citati.json', 'text/plain')
  }

  const deleteStorage = () => {
    localStorage.clear()
  }

  return (
    <main>
      <h1>{translate('TOOLS')}</h1>
      <p>
        <button onClick={saveFile}>Export quotes</button>
      </p>
      <p>
        <button onClick={deleteStorage}>Delete local storage</button>
      </p>
    </main>
  )
}

export default Tools
