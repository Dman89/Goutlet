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
import { icons } from './icons';
import NavBarContainer from './components/NavBarContainer';
import IconContainer from './components/IconContainer';
import Icon from './components/Icon';
import IconsIcon from './components/IconsIcon';
import IconsLabel from './components/IconsLabel';

export function NavBar() {
  function renderIcons() {
    return icons.map(function mapFn(icon) {
      return (
        <Icon key={icon.url}>
          <NavLink
            exact
            activeClassName="active"
            to={icon.url}
          >
            <IconsIcon>
              <img id={icon.title} alt={icon.title} src={icon.icon} />
            </IconsIcon>
            <IconsLabel>
              <FormattedMessage id={icon.url} defaultMessage={icon.title} />
            </IconsLabel>
          </NavLink>
        </Icon>
      );
    });
  }

  return (
    <NavBarContainer>
      <IconContainer>
        {renderIcons.call(this)}
      </IconContainer>
    </NavBarContainer>
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
