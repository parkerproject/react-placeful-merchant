import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'
import Overview from './components/overview'
import PromoNew from './components/promo_new'
import Login from './components/auth/login'
import Register from './components/register'
import ForgotPass from './components/auth/forgot_pass'

export default (
<Route>
  <Route path='/login' component={Login} />
  <Route path='/register' component={Register} />
  <Route path='/forgotpass' component={ForgotPass} />
  <Route path='/' component={App}>
    <IndexRoute component={Overview} />
    <Route path='/home' component={Overview} />
    <Route path='/promo/new' component={PromoNew} />
  </Route>
</Route>

)
