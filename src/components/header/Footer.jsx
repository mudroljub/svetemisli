import React from 'react'

import {useTranslate} from '../../store/actions'
import twitter from './twitter.png'

export default function Footer() {
  const translate = useTranslate()

  return (
    <footer>
      <a style={{ marginRight: '8px' }} href="https://twitter.com/svetemysli" target="_blank" rel="noopener noreferrer">
        <img src={twitter} alt="twitter" />
      </a>
      <small><code>{translate('FOOTER_TEXT')} mudroljub(at)gmail.com</code></small>
    </footer>
  )
}
