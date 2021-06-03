import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useTranslate, toggleTranslationMode, toggleDevMode, setOfflineMode, sendQuote } from '../store/actions'
import { LS } from '../config/localstorage'

const Profile = () => {
  const { translationMode, devMode, offlineMode } = useSelector(state => state)
  const translate = useTranslate()
  const dispatch = useDispatch()
  const name = 'Gost'

  const toggleTranslate = () => {
    dispatch(toggleTranslationMode())
  }

  const toggleDev = () => {
    dispatch(toggleDevMode())
  }

  const toggleOffline = () => {
    dispatch(setOfflineMode(!offlineMode))
  }

  const sync = () => {
    const quotes = JSON.parse(localStorage.getItem(LS.updatedOffline))
    if (!quotes) return alert('Nema ništa na čekanju')

    const promises = quotes.map(quote => dispatch(sendQuote(quote)))
    Promise.all(promises)
      .then(() => {
        alert('Uspešno ažurirano')
        localStorage.removeItem(LS.updatedOffline)
      })
      .catch(() => {
        alert(translate('NETWORK_PROBLEM'))
      })
  }

  return (
    <main>
      <h1>{translate('PROFILE')}</h1>
      <div>
        <p>name: {name}</p>
        <p>dev mode:{' '}
          <label>
            <input
              type="radio"
              name="dev-mode"
              value="off"
              checked={!devMode}
              onChange={toggleDev}
            /> off
          </label>
          <label>
            <input
              type="radio"
              name="dev-mode"
              value="on"
              checked={devMode}
              onChange={toggleDev}
            /> on
          </label>
        </p>
        <p>translation mode:{' '}
          <label>
            <input
              type="radio"
              name="translation-mode"
              value="off"
              checked={!translationMode}
              onChange={toggleTranslate}
            /> off
          </label>
          <label>
            <input
              type="radio"
              name="translation-mode"
              value="on"
              checked={translationMode}
              onChange={toggleTranslate}
            /> on
          </label>
        </p>
        <p>offline mode:{' '}
          <label>
            <input
              type="radio"
              name="offline-mode"
              value="off"
              checked={!offlineMode}
              onChange={toggleOffline}
            /> off
          </label>
          <label>
            <input
              type="radio"
              name="offline-mode"
              value="on"
              checked={offlineMode}
              onChange={toggleOffline}
            /> on
          </label>
        </p>
        <button onClick={sync}>sync ↻</button>
      </div>
    </main>
  )
}

export default Profile
