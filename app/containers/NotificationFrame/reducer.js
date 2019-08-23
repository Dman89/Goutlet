/*
 *
 * NotificationFrame reducer
 *
 */
import produce from 'immer';
import { ADD_TOAST_MESSAGE, CLOSE_TOAST_MESSAGE } from './constants';

export const initialState = {
  toasters: []
};

/* eslint-disable default-case, no-param-reassign */
const notificationFrameReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_TOAST_MESSAGE:
        draft.toasters = [ ...state.toasters, { ...action.payload } ];
        break;
      case CLOSE_TOAST_MESSAGE:
        draft.toasters = state.toasters.filter((toaster, index) => (toaster.id !== action.payload && index !== action.payload));
        break;
    }
  });

export default notificationFrameReducer;
