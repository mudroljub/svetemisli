import React from 'react'
import {useSelector} from 'react-redux'

import EditForm from '../components/main/EditForm'

const EditQuote = ({ match }) => {
  const { id } = match.params
  const {allQuotes} = useSelector(state => state)

  const quote = allQuotes.find(q => q._id === Number(id))

  return <EditForm quote={quote} />
}

export default EditQuote
