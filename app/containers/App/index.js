/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NotificationFrame from 'containers/NotificationFrame/Loadable';
import NavBar from 'containers/NavBar/index';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/explore" render={() => <div>hey</div>} />
        <Route component={NotFoundPage} />
      </Switch>
      <NotificationFrame />
      <NavBar />
      <GlobalStyle />
    </div>
  );
}
