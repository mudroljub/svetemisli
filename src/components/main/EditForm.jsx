import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {useTranslate, saveQuote} from '../../store/actions'
import MessagePopup from './MessagePopup'

const EditForm = ({ quote }) => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const history = useHistory()

  const [validation, setValidation] = useState('')
  const [message, setMessage] = useState('')

  const postQuote = async e => {
    e.preventDefault()
    setValidation('')
    const data = Object.values(e.target.elements)
      .filter(el => el.name)
      .reduce((acc, el) => ({...acc, [el.name]: el.value.trim()}), {})

    if (!(data.author && (data.ocs || data.sr || data.ms))) return setValidation(translate('REQUIRED_FIELDS'))

    if (data._id) data._id = Number(data._id)
    const id = dispatch(saveQuote(data))
    history.push(`/citat/${id}`)
  }

  return (
    <div>
      <h1>
        {translate(quote ? 'EDIT_QUOTE' : 'ADD_QUOTE')}
        {quote && quote._id && <small><sup>(<Link to={`/citat/${quote._id}`}>show</Link>)</sup></small>}
      </h1>

      <form onSubmit={postQuote}>
        <input type="hidden" name="_id" defaultValue={quote && quote._id} />
        <p>
          <label htmlFor="author">{translate('AUTHOR')}</label><br/>
          <input name="author" id="author" placeholder={translate('AUTHOR_TIP')} defaultValue={quote && quote.author} autoFocus />
        </p>
        <p>
          <label htmlFor="ocs" >{translate('TEXT')} ({translate('OLDSLAVIC')})</label><br />
          <textarea name="ocs" id="ocs" defaultValue={quote && quote.ocs} cols="60" rows="5"></textarea>
        </p>
        <p>
          <label htmlFor="sr" >{translate('TEXT')} ({translate('SERBOCROATIAN')})</label><br />
          <textarea name="sr" id="sr" defaultValue={quote && quote.sr} cols="60" rows="5"></textarea>
        </p>
        <p>
          <label htmlFor="ms" >{translate('TEXT')} ({translate('INTERSLAVIC')}) </label><br />
          <textarea name="ms" id="ms" defaultValue={quote && quote.ms} cols="60" rows="5"></textarea>
        </p>
        <p>
          <label htmlFor="source">{translate('SOURCE')} </label><br/>
          <input name='source' id='source' defaultValue={quote && quote.source} />
        </p>
        {/* <p>
          <label htmlFor="wiki">Wiki </label><br/>
          <input name='wiki' id='wiki' defaultValue={quote && quote.wiki} />
        </p> */}
        {validation && <p className="red">{validation}</p>}
        <button type="submit">{translate('POST')}</button>
      </form>

      {message && <MessagePopup message={message} closePopup={() => setMessage('')} />}
    </div>
  )
}

export default EditForm