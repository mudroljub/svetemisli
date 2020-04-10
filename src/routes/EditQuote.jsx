import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'

import {useTranslate} from '../store/actions'
import EditForm from '../components/main/EditForm'
import preloader from '../assets/images/preloader.svg'
import {API} from '../config/api'
import {getSavedQuote} from '../utils/helpers'

const EditQuote = ({ match }) => {
  const { id } = match.params
  const {admin, allQuotes, offlineMode} = useSelector(state => state)
  const translate = useTranslate()

  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState(allQuotes.find(q => q._id === id))

  const savedQuote = offlineMode ? getSavedQuote(id) : null

  useEffect(() => {
    if (savedQuote || quote) return
    setLoading(true)
    fetch(`${API.read}/id/${id}`)
      .then(res => res.json())
      .then(quote => {
        setLoading(false)
        setQuote(quote)
      })
  }, [id, quote, savedQuote])

  if (loading) return <img src={preloader} alt="loading..." />
  if (!admin) return <p>{translate('ADMIN_REQUIRED')}</p>

  return <EditForm quote={savedQuote || quote} />
}

export default EditQuote
