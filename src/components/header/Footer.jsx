import React from 'react'

import {useTranslate} from '../../store/actions'

export default function Footer() {
  const translate = useTranslate()

  return (
    <footer>
      <small>{translate('FOOTER_TEXT')} <code>mudroljub(at)gmail.com</code></small>
    </footer>
  )
}
