/*
 *
 * NotificationFrame actions
 *
 */

import { ADD_TOAST_MESSAGE, CLOSE_TOAST_MESSAGE } from './constants';

/**
 * Adds toaster message to the screen.
 *
 * @param  {object} newState Object is passed directly to the reducer. Required values are open, message, title, id
 *
 * @return {object} An action object with a type of ADD_TOAST_MESSAGE
 */
export function addToaster(newState) {
  return {
    type: ADD_TOAST_MESSAGE,
    payload: { ...newState }
  };
}

/**
 * Closes the toaster message.
 *
 * @param  {string} id Pass an ID to close the proper toaster.
 *
 * @return {object} An action object with a type of CLOSE_TOAST_MESSAGE
 */
export function closeToaster(id) {
  return {
    type: CLOSE_TOAST_MESSAGE,
    payload: id
  };
}


