import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const SpinnerOverlay = props => (
  <Spinner
    visible={props.isLoading}
  />
);

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
  };
}

export default connect(mapStateToProps)(SpinnerOverlay);
