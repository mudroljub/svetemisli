import React from 'react'

import { useTranslate } from '../store/actions'

const Tools = () => {
  const translate = useTranslate()

  const saveFile = () => {
    // TODO: implement
  }

  // TODO: delete LS
  // TODO: shuffle(quotes)

  return (
    <main>
      <h1>{translate('TOOLS')}</h1>
      <div>
        <button onClick={saveFile}>{translate('SAVE_FILE')}</button>
      </div>
    </main>
  )
}

export default Tools
