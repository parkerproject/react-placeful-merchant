import React, { Component, PropTypes } from 'react'
import Header from './global/header'
import Sidebar from './global/sidebar'
import Footer from './global/footer'
import { connect } from 'react-redux'
import * as actions from '../actions'

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
    return (
    <div>
      <Header />
      <Sidebar merchant={this.props.merchant}/>
        <div className='page-content'>
      		<div className='container-fluid'>
      			{React.cloneElement(this.props.children, this.props)}
      		</div>
      	</div>
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
