import React from 'react'

import { useTranslate } from '../store/actions'

const Tools = () => {
  const translate = useTranslate()

  const sync = () => {
    // TODO: implement save fajl
  }

  return (
    <main>
      <h1>{translate('TOOLS')}</h1>
      <div>
        <button onClick={sync}>sync ↻</button>
      </div>
    </main>
  )
}

export default Tools
