import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notificationFrame state domain
 */

const selectNotificationFrameDomain = state => state.notificationFrame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotificationFrame
 */

const makeSelectNotificationFrame = () =>
  createSelector(
    selectNotificationFrameDomain,
    substate => substate.toasters
  );

export default makeSelectNotificationFrame;
export { selectNotificationFrameDomain };
