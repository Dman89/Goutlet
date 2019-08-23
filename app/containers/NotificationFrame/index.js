/**
 *
 * NotificationFrame
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotificationFrame from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Toaster from 'components/Toaster';
import { addToaster, closeToaster } from './actions';

const key = 'notificationFrame';

export function NotificationFrame({
  addToaster,
  closeToaster,
  toasters
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  let toastersHTML = '';
  if (toasters.length) {
    toastersHTML = toasters.map((toaster, index) => <Toaster key={toaster.sys_id || index} id={toaster.sys_id || index} { ...toaster } closeToaster={closeToaster} />);
  }
  return toastersHTML;
}

NotificationFrame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addToaster: PropTypes.func,
  closeToaster: PropTypes.func,
  toasters: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  toasters: makeSelectNotificationFrame(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeToaster: evt => dispatch(closeToaster(evt)),
    addToaster: evt => dispatch(addToaster(evt))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NotificationFrame);