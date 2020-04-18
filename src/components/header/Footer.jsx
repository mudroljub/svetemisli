import React from 'react'

import {useTranslate} from '../../store/actions'
import twitter from './twitter.png'
import youtube from './youtube.png'
import facebook from './facebook.png'

export default function Footer() {
  const translate = useTranslate()

  return (
    <footer>
      <small>
        <a style={{ marginRight: '8px', verticalAlign: 'middle' }} href="https://www.youtube.com/channel/UCdj34UyN5y60nIc_Bybr-Gg" target="_blank" rel="noopener noreferrer" title="Svete misli Youtube">
          <img src={youtube} alt="youtube" />
        </a>
        <a style={{ marginRight: '8px', verticalAlign: 'middle' }} href="https://twitter.com/svetemysli" target="_blank" rel="noopener noreferrer" title="Svete misli Twitter">
          <img src={twitter} alt="twitter" />
        </a>
        <a style={{ marginRight: '8px', verticalAlign: 'middle' }} href="https://www.facebook.com/Svete-misli-104015637951243" target="_blank" rel="noopener noreferrer" title="Svete misli Facebook">
          <img src={facebook} alt="facebook" />
        </a>
        <code>{translate('FOOTER_TEXT')} mudroljub(at)gmail.com</code>
      </small>
    </footer>
  )
}
