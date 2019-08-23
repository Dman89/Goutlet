import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainFrame state domain
 */

const selectMainFrameDomain = state => state.mainFrame || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainFrame
 */

const makeSelectMainFrame = () =>
  createSelector(
    selectMainFrameDomain,
    substate => substate,
  );

export default makeSelectMainFrame;
export { selectMainFrameDomain };
