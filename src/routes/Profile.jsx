import React from 'react'

import { useTranslate } from '../store/actions'

const Profile = () => {
  const translate = useTranslate()
  const name = 'Gost'

  const sync = () => {
    // TODO: implement save fajl
  }

  return (
    <main>
      <h1>{translate('PROFILE')}</h1>
      <div>
        <p>name: {name}</p>
        <button onClick={sync}>sync ↻</button>
      </div>
    </main>
  )
}

export default Profile
