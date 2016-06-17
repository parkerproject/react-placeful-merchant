import React, { Component } from 'react'
import * as actions from '../actions'
import SkyLight from 'react-skylight'
import { connect } from 'react-redux'

class pausePromo extends Component {
  constructor(props) {
    super(props)
  // this.refs.simpleDialog.show()
  }

  render() {
    return (
    <div>
      <section>
        <h1>React SkyLight</h1>
      </section>
      <SkyLight hideOnOverlayClicked ref='simpleDialog' title='Hi, Im a simple modal'>
        Hello, I dont have any callback.
      </SkyLight>
    </div>
    )
  }

}

function mapStateToProps (state) {
  return {authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, actions)(pausePromo)
