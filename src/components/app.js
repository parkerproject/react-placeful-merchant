import React, { Component } from 'react'
import Header from './global/header'
import Sidebar from './global/sidebar'
import Footer from './global/footer'

export default class App extends Component {
  render() {
    return (
    <div className='wrapper'>
      <Header />
      <Sidebar />
      <div className='content-wrapper'>
        <section className='content'>
          {this.props.children}
        </section>
      </div>
      <Footer />
    </div>
    )
  }
}
