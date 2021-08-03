import React, {useEffect} from 'react'

import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import Router from './Router'
import Footer from './header/Footer'
import './app.css'

const onEscape = e => {
  if (e.key === 'Escape') window.history.back()
}

const App = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('service-worker.js')

    window.addEventListener('keyup', onEscape)
    return () => window.removeEventListener('keyup', onEscape)
  }, [])

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
