import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'
import PromoNew from './components/promo_new'
import Login from './components/auth/login'
import Logout from './components/auth/logout'
import Signup from './components/auth/signup'
import ForgotPass from './components/auth/forgot_pass'
import RequireAuth from './components/auth/require_auth'
import Promos from './components/promos'
import EditPromo from './components/promo_edit'
import Inbox from './components/inbox'
import Profile from './components/profile'
import SingleMessage from './components/inbox_single'
import FollowersPromote from './components/followers_promote'
import LastMinutePromo from './components/promo_last_minute'
import Analytics from './components/analytics'

export default (
<Route>
  <Route path='/login' component={Login} />
  <Route path='/signup' component={Signup} />
  <Route path='/logout' component={RequireAuth(Logout)} />
  <Route path='/forgotpass' component={ForgotPass} />
  <Route path='/' component={App}>
    <IndexRoute component={RequireAuth(Promos)} />
    <Route path='/promo/new' component={RequireAuth(PromoNew)} />
    <Route path='/promotions' component={RequireAuth(Promos)} />
    <Route path='/quick_promo' component={RequireAuth(LastMinutePromo)} />
    <Route path='/followers/promote' component={RequireAuth(FollowersPromote)} />
    <Route path='/inbox' component={RequireAuth(Inbox)} />
    <Route path='/message/:id' component={RequireAuth(SingleMessage)} />
    <Route path='/analytics' component={RequireAuth(Analytics)} />
    <Route path='/profile' component={RequireAuth(Profile)} />
    <Route path='/promotion/edit/:id' component={RequireAuth(EditPromo)} />
  </Route>
</Route>

)
