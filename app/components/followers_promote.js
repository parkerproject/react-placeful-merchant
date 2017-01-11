import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FollowersPromoteMessage from './partials/followers_promote_message';
import FollowersPromoteForm from './partials/followers_promote_form';

const FollowersPromote = (props) => {
  if (!props.merchant) {
    return (
      <div>
        loading...
      </div>
    );
  }
  const followersCount = props.merchant[0].followers.length;
  return (
    <div>
      {followersCount < 100 ?
        <FollowersPromoteMessage /> :
        <FollowersPromoteForm merchant={props.merchant} />}
    </div>
  );
};


FollowersPromote.propTypes = {
  merchant: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(FollowersPromote);
