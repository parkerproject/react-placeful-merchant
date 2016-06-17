import React, { Component } from 'react'
import Header from './global/header'
import Sidebar from './global/sidebar'
import Footer from './global/footer'
import { connect } from 'react-redux'
import * as actions from '../actions'

class App extends Component {
  componentWillMount () {
    this.props.fetchPromos()
    this.props.fetchMerchantInfo()
  }

  render () {
    return (
    <div className='wrapper'>
      <Header />
      <Sidebar />
      <div className='content-wrapper'>
        <section className='content'>
          {React.cloneElement(this.props.children, this.props)}
        </section>
      </div>
      <Footer />
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    promos: state.promos.promos,
    merchant: state.merchant.merchant
  }
}

export default connect(mapStateToProps, actions)(App)
