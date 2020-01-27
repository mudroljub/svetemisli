import React, {Suspense} from 'react'
import {Switch, Route} from 'react-router-dom'

import Profile from '../routes/Profile'
const AllQuotes = React.lazy(() => import('../routes/AllQuotes'))
const Author = React.lazy(() => import('../routes/Author'))
const EditQuote = React.lazy(() => import('../routes/EditQuote'))
const AddQuote = React.lazy(() => import('../routes/AddQuote'))
const ShowQuote = React.lazy(() => import('../routes/ShowQuote'))
const RandomQuote = React.lazy(() => import('../routes/RandomQuote'))
const Login = React.lazy(() => import('../routes/Login'))
const Auth = React.lazy(() => import('../routes/Auth'))
const Untranslated = React.lazy(() => import('../routes/Untranslated'))

function waitFor(Component) {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  )
}

const Router = () => (
  <Switch>
    <Route path='/' exact component={waitFor(RandomQuote)} />
    <Route path='/citati' component={waitFor(AllQuotes)} />
    <Route path='/prijava' component={waitFor(Login)} />
    <Route path='/citat/:id' component={waitFor(ShowQuote)} />
    <Route path='/autor/:name' component={waitFor(Author)} />
    <Route path='/dodaj-citat' component={waitFor(AddQuote)} />
    <Route path='/neprevedeno' component={waitFor(Untranslated)} />
    <Route path='/pravi-citat/:id' component={waitFor(EditQuote)} />
    <Route path='/moj-profil' component={Profile} />
    <Route path='/auth/:service/:token' component={waitFor(Auth)} />
  </Switch>
)

export default Router
