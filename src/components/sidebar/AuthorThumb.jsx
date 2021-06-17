import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

import {useAuthorName, filterQuotes, toggleSelectedAuthors} from '../../store/actions'
import unknownImage from '../../assets/images/unknown.jpg'
import './author-thumb.css'

const AuthorThumb = ({ author, image }) => {
  const dispatch = useDispatch()
  const authorName = useAuthorName()
  const {selectedAuthors} = useSelector(state => state)
  const link = `/avtor/${author.replace(/ /g, '_')}`

  const handleCheck = ({target}) => {
    const {checked, value} = target
    dispatch(toggleSelectedAuthors(checked, value))
    dispatch(filterQuotes())
  }

  return (
    <div className="author-wrap">
      <NavLink className="author" to={link} activeClassName="active">
        <img src={image || unknownImage} alt="img" />
        {authorName(author)}
      </NavLink>
      <label>
        <input
          type="checkbox"
          value={author}
          checked={selectedAuthors.includes(author)}
          onChange={handleCheck}
        />
      </label>
    </div>
  )
}

export default AuthorThumb
