/**
 *
 * NavBar
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import messages from './messages';

import {
  cookbookIconSRC,
  searchIconSRC,
  plannerSRC,
  pantryIconSRC,
} from './images';

const icons = [
  {
    title: messages.pantry.defaultMessage,
    icon: pantryIconSRC,
    urlValue: 0,
    url: 'pantry',
  },
  {
    title: messages.cookbook.defaultMessage,
    icon: cookbookIconSRC,
    urlValue: 1,
    url: 'cookbook',
  },
  {
    title: messages.explore.defaultMessage,
    icon: searchIconSRC,
    urlValue: 2,
    url: 'explore',
  },
  {
    title: messages.planner.defaultMessage,
    icon: plannerSRC,
    urlValue: 3,
    url: 'planner',
  },
];

export function NavBar() {
  function renderIcons() {
    return icons.map(function mapFn(icon) {
      return (
        <NavLink
          exact
          activeClassName="active"
          to={icon.url}
          className="Bottom-Panel-Icons pointer"
          key={icon.url}
        >
          <div className="Bottom-Panel-Icon">
            <img id={icon.title} alt={icon.title} src={icon.icon} />
          </div>
          <div className="Bottom-Panel-Label">
            <FormattedMessage id={icon.url} defaultMessage={icon.title} />
          </div>
        </NavLink>
      );
    });
  }

  return (
    <div className="Bottom-Panel">
      <div className="Bottom-Panel-Icon-Container">
        {renderIcons.call(this)}
      </div>
    </div>
  );
}

NavBar.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(NavBar);
