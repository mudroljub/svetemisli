import React from 'react'

import { useTranslate } from '../store/actions'

const Tools = () => {
  const translate = useTranslate()

  const saveFile = () => {
    // TODO: implement
  }

  const deleteStorage = () => {
    localStorage.clear()
  }

  // TODO: shuffle(quotes)

  return (
    <main>
      <h1>{translate('TOOLS')}</h1>
      <p>
        <button onClick={saveFile}>{translate('SAVE_FILE')}</button>
      </p>
      <p>
        <button onClick={deleteStorage}>Delete user data</button>
      </p>
    </main>
  )
}

export default Tools
