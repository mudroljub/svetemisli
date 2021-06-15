import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Tools from '../routes/Tools'
import RandomQuote from '../routes/RandomQuote'
import AllQuotes from '../routes/AllQuotes'
import Author from '../routes/Author'
import EditQuote from '../routes/EditQuote'
import AddQuote from '../routes/AddQuote'
import ShowQuote from '../routes/ShowQuote'
import Stats from '../routes/Stats'
import Favorites from '../routes/Favorites'
import Untranslated from '../routes/Untranslated'

const Router = () => (
  <Switch>
    <Route path='/' exact component={RandomQuote} />
    <Route path='/citati' component={AllQuotes} />
    <Route path='/citat/:id' component={ShowQuote} />
    <Route path='/avtor/:name' component={Author} />
    <Route path='/dodaj-citat' component={AddQuote} />
    <Route path='/pravi-citat/:id' component={EditQuote} />
    <Route path='/orudja' component={Tools} />
    <Route path='/statistika' component={Stats} />
    <Route path='/favorites' component={Favorites} />
    <Route path='/neprevedeno' component={Untranslated} />
  </Switch>
)

export default Router
