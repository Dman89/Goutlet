/**
 *
 * Asynchronously loads the component for MainFrame
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
