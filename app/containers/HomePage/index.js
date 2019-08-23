/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import NotificationFrame from '../NotificationFrame';
import MainFrame from '../MainFrame';

export default function HomePage() {
  return (
    <>
      <NotificationFrame key="notificationFrame" />
      <MainFrame key="mainFrame" />
    </>
  );
}
