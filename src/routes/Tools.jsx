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
  // {translate('SAVE_FILE')}

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
