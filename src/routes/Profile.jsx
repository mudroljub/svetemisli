import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'

import {setUser, logout, useTranslate, toggleTranslationMode, toggleDevMode} from '../store/actions'
import {LS} from '../config/localstorage'
import {domain} from '../config/api'

const Profile = () =>  {
  const {token, admin, translationMode, devMode} = useSelector(state => state)
  const translate = useTranslate()
  const dispatch = useDispatch()
  const [memberSince, setMemberSince] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    if (!token) return
    const service = localStorage.getItem(LS.service)
    const authLink = `${domain}/auth/${service}/${token}`
    fetch(authLink)
      .then(data => data.json())
      .then(data => {
        const { name, admin, memberSince } = data.user
        setMemberSince(memberSince)
        setName(name)
        dispatch(setUser(token, admin))
      })
  }, [dispatch, token])

  const exit = () => {
    dispatch(logout())
  }

  const toggleTranslate = () => {
    dispatch(toggleTranslationMode())
  }

  const toggleDev = () => {
    dispatch(toggleDevMode())
  }

  return (
    <main>
      <h1>{translate('PROFILE')}</h1>
      {token ?
        <div>
          <p>name: {name}</p>
          <p>member since: {new Date(memberSince).toISOString().slice(0, 10)}</p>
          <p>admin: {admin ? 'yes' : 'no'}</p>
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

          <p style={{ textAlign: 'center'}}><button onClick={exit}>{translate('LOGOUT')}</button></p>
        </div>
        : <p>{translate('SUCCESSFULLY_LOGOUT')}</p>
      }
    </main>
  )
}

export default Profile
