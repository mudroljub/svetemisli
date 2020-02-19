import React from 'react'

import {useTranslate} from '../../store/actions'
import twitter from './twitter.png'

export default function Footer() {
  const translate = useTranslate()

  return (
    <footer>
      <small>
        <a style={{ marginRight: '8px', verticalAlign: 'middle' }} href="https://twitter.com/svetemysli" target="_blank" rel="noopener noreferrer" title="Svete mysli Twitter">
          <img src={twitter} alt="twitter" />
        </a>
        <code>{translate('FOOTER_TEXT')} mudroljub(at)gmail.com</code>
      </small>
    </footer>
  )
}
