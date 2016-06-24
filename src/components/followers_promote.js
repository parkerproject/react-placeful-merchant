import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import FollowersPromoteMessage from './partials/followers_promote_message'
import FollowersPromoteForm from './partials/followers_promote_form'

class FollowersPromote extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    merchant: PropTypes.array
}

  render () {
    if (!this.props.merchant) {
      return (
      <div>
        loading...
      </div>
      )
    }
    const followersCount = this.props.merchant[0].followers.length
    return (
    <div>
      {followersCount < 100 ? <FollowersPromoteForm merchant={this.props.merchant}/> : 'too few'}
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(FollowersPromote)
