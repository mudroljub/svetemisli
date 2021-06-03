import React from 'react'
import {useSelector} from 'react-redux'

import EditForm from '../components/main/EditForm'
import {getSavedQuote} from '../utils/helpers'

const EditQuote = ({ match }) => {
  const { id } = match.params
  const {allQuotes, offlineMode} = useSelector(state => state)

  const quote = allQuotes.find(q => q._id === id)
  const savedQuote = offlineMode ? getSavedQuote(id) : null

  return <EditForm quote={savedQuote || quote} />
}

export default EditQuote
