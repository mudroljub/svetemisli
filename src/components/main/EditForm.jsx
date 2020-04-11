import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {useTranslate, sendQuote} from '../../store/actions'
import {LS} from '../../config/localstorage'
import MessagePopup from './MessagePopup'

const EditForm = ({ quote }) => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const history = useHistory()
  const {offlineMode} = useSelector(state => state)

  const [validation, setValidation] = useState('')
  const [response, setResponse] = useState('')

  const saveLocal = obj => {
    const oldArr = JSON.parse(localStorage.getItem(LS.updatedOffline))
    // ako nema niza kreira, ako sadrzi citat azurira, ako nema dodaje
    const newArr = !Array.isArray(oldArr)
      ? [obj]
      : oldArr.find(x => x._id === obj._id)
        ? oldArr.map(x => x._id === obj._id ? obj : x)
        : [...oldArr, obj]
    localStorage.setItem(LS.updatedOffline, JSON.stringify(newArr))
    history.push(`/citat/${obj._id}`)
  }

  const postQuote = async e => {
    e.preventDefault()
    setValidation('')
    const obj = Object.values(e.target.elements)
      .filter(el => el.name)
      .reduce((acc, el) => ({...acc, [el.name]: el.value.trim()}), {})

    if (!obj.author || !obj.sr) return setValidation(translate('REQUIRED_FIELDS'))

    if (offlineMode) return saveLocal(obj)

    try {
      const id = await dispatch(sendQuote(obj))
      history.push(`/citat/${id}`)
    } catch (error) {
      setResponse(translate('NETWORK_PROBLEM'))
    }
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
          <label htmlFor="author" title={translate('AUTHOR_TIP')}>{translate('AUTHOR')} *</label><br/>
          <input name="author" id="author" defaultValue={quote && quote.author} autoFocus />
        </p>
        <p>
          <label htmlFor="sr" >Tekst ({translate('SERBOCROATIAN')}) *</label><br />
          <textarea name="sr" id="sr" defaultValue={quote && quote.sr} cols="60" rows="5"></textarea>
        </p>
        <p>
          <label htmlFor="ms" >Tekst ({translate('INTERSLAVIC')}) </label><br />
          <textarea name="ms" id="ms" defaultValue={quote && quote.ms} cols="60" rows="5"></textarea>
        </p>
        <p>
          <label htmlFor="source">{translate('SOURCE')} </label><br/>
          <input name='source' id='source' defaultValue={quote && quote.source} />
        </p>
        <p>
          <label htmlFor="tags">{translate('TAGS')} </label><br/>
          <input name='tags' id='tags' defaultValue={quote && quote.tags} />
        </p>
        <p>
          <label htmlFor="wiki">Wiki </label><br/>
          <input name='wiki' id='wiki' defaultValue={quote && quote.wiki} />
        </p>
        {validation && <p className="red">{validation}</p>}
        <button type="submit">{translate('POST')}</button>
      </form>

      {response && <MessagePopup message={response} closePopup={() => setResponse('')} />}
    </div>
  )
}

export default EditForm