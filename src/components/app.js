import React, { Component, PropTypes } from 'react'
import Header from './global/header'
import Sidebar from './global/sidebar'
import Footer from './global/footer'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Intercom from 'react-intercom'

class App extends Component {
  static propTypes = {
    fetchMerchantInfo: PropTypes.func,
    fetchPromos: PropTypes.func,
    fetchFollowersPromos: PropTypes.func
}
  componentWillMount () {
    this.props.fetchPromos()
    this.props.fetchMerchantInfo()
    this.props.fetchFollowersPromos()
  }

  render () {
    if(!this.props.merchant){
      return <div>Loading</div>
    }
    const user = {
      email: this.props.merchant[0].business_email,
      name: this.props.merchant[0].business_name
    }
    return (
    <div>
      <Header />
      <Sidebar merchant={this.props.merchant}/>
        <div className='page-content'>
      		<div className='container-fluid'>
      			{React.cloneElement(this.props.children, this.props)}
      		</div>
      	</div>
        <Intercom appID='s3kazult' { ...user } />
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    promos: state.promos.promos,
    merchant: state.merchant.merchant,
    followers_promos: state.followers_promos.promos
  }
}

export default connect(mapStateToProps, actions)(App)
