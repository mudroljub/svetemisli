import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {LS} from '../config/localstorage'
import {fetchQuotes, checkCountry} from '../store/actions'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import Router from './Router'
import Footer from './header/Footer'
import './app.css'

const App = () => {
  const {translationMode, devMode} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (translationMode || devMode) dispatch(fetchQuotes())
    if (!localStorage.getItem(LS.lang) && !localStorage.getItem(LS.script))
      dispatch(checkCountry())

    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('service-worker.js')
  }, [translationMode, devMode, dispatch])

  return (
    <div className="App">
      <section className="main-section">
        <Header />
        <Router />
      </section>
      <Sidebar/>
      <Footer />
    </div>
  )
}

export default App
