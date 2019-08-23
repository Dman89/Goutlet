/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import NotificationFrame from './../NotificationFrame';
import MainFrame from './../MainFrame';

import messages from './messages';

export default function HomePage() {
  
  return (
    <NotificationFrame key="notificationFrame" />,
    <MainFrame key="mainFrame" />
  );
}
