import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import PromoNew from './components/Promo/new';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Signup from './components/auth/signup';
import ForgotPass from './components/auth/forgot_pass';
import requireAuth from './components/auth/require_auth';
import Promos from './components/promos';
import EditPromo from './components/Promo/edit';
import Inbox from './components/inbox';
import Profile from './components/profile';
import SingleMessage from './components/inbox_single';
import FollowersPromote from './components/followers_promote';
import LastMinutePromo from './components/Promo/last-minute';
import Analytics from './components/analytics';
import SetPassword from './components/auth/set_password';
import StripeView from './components/stripe';
import ConnectSocial from './components/connect_social';

export default (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/logout" component={requireAuth(Logout)} />
    <Route path="/forgotpass" component={ForgotPass} />
    <Route path="/setpass" component={SetPassword} />
    <Route path="/" component={App}>
      <IndexRoute component={requireAuth(Promos)} />
      <Route path="/promo/new" component={requireAuth(PromoNew)} />
      <Route path="/promotions" component={requireAuth(Promos)} />
      <Route path="/quick_promo" component={requireAuth(LastMinutePromo)} />
      <Route path="/followers/promote" component={requireAuth(FollowersPromote)} />
      <Route path="/inbox" component={requireAuth(Inbox)} />
      <Route path="/payment" component={requireAuth(StripeView)} />
      <Route path="/message/:id" component={requireAuth(SingleMessage)} />
      <Route path="/analytics" component={requireAuth(Analytics)} />
      <Route path="/profile" component={requireAuth(Profile)} />
      <Route path="/connect_social" component={requireAuth(ConnectSocial)} />
      <Route path="/promotion/edit/:id" component={requireAuth(EditPromo)} />
    </Route>
  </Route>

);
