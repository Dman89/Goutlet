/*
 * NavBar Messages
 *
 * This contains all the text for the NavBar container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NavBar';

export default defineMessages({
  cookbook: {
    id: `${scope}.cookbook`,
    defaultMessage: 'Cookbook',
  },
  explore: {
    id: `${scope}.explore`,
    defaultMessage: 'explore',
  },
  pantry: {
    id: `${scope}.pantry`,
    defaultMessage: 'Pantry',
  },
  planner: {
    id: `${scope}.planner`,
    defaultMessage: 'Planner',
  },
});
