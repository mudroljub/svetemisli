import React, {useState, useEffect} from 'react'
import {findValue} from '../../utils/helpers'

const prepareInfo = (author, info) => {
  if (!info) return ''
  const wikiUrl = `https://sh.wikipedia.org/wiki/${encodeURIComponent(author)}`
  return `${info} <a href=${wikiUrl} target="_blank">Wikipedia</a>`
}

export default function AuthorInfo({ author }) {
  const [info, setInfo] = useState('')

  // https://stackoverflow.com/questions/56442582
  useEffect(() => {
    let isCancelled = false
    setInfo('')
    fetch(`https://sh.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(author)}&prop=extracts&format=json&origin=*&redirects=1&exsentences=2&exintro=1`)
      .then(response => response.json())
      .then(obj => {
        const info = findValue(obj, 'extract')
        if (!isCancelled) setInfo(prepareInfo(author, info))
      })

    return () => {
      isCancelled = true
    }
  }, [author])

  return (
    <small dangerouslySetInnerHTML={{__html: info}}></small>
  )
}
