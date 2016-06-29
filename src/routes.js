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
import SetPassword from './components/auth/set_password'

export default (
<Route>
  <Route path='/app/login' component={Login} />
  <Route path='/app/signup' component={Signup} />
  <Route path='/app/logout' component={RequireAuth(Logout)} />
  <Route path='/app/forgotpass' component={ForgotPass} />
  <Route path='/app/setpass' component={SetPassword} />
  <Route path='/app' component={App}>
    <IndexRoute component={RequireAuth(Promos)} />
    <Route path='/app/promo/new' component={RequireAuth(PromoNew)} />
    <Route path='/app/promotions' component={RequireAuth(Promos)} />
    <Route path='/app/quick_promo' component={RequireAuth(LastMinutePromo)} />
    <Route path='/app/followers/promote' component={RequireAuth(FollowersPromote)} />
    <Route path='/app/inbox' component={RequireAuth(Inbox)} />
    <Route path='/app/message/:id' component={RequireAuth(SingleMessage)} />
    <Route path='/app/analytics' component={RequireAuth(Analytics)} />
    <Route path='/app/profile' component={RequireAuth(Profile)} />
    <Route path='/app/promotion/edit/:id' component={RequireAuth(EditPromo)} />
  </Route>
</Route>

)
