import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {checkUser, useTranslate} from '../store/actions'

let checked = false

const Auth = ({match}) => {
  const dispatch = useDispatch()
  const translate = useTranslate()

  useEffect(() => {
    if (checked) return
    const {service, token} = match.params
    dispatch(checkUser(token, service))
    checked = true
  }, [dispatch, match.params])

  return (
    <main>
      <h1>Auth</h1>
      <p>{translate('SUCCESSFULLY_LOGIN')}</p>
      <code>goto</code> <Link to="/moj-profil">{translate('PROFILE')}</Link>
    </main>
  )
}

export default Auth
