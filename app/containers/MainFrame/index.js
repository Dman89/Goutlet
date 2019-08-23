/**
 *
 * MainFrame
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import pantryIconSRC from 'svg-url-loader?name=[name].[ext]!../../images/pantry.svg';
import cookbookIconSRC from 'svg-url-loader?name=[name].[ext]!../../images/cookbook.svg';
import searchIconSRC from 'svg-url-loader?name=[name].[ext]!../../images/search.svg';
import plannerSRC from 'svg-url-loader?name=[name].[ext]!../../images/planner.svg';
import makeSelectMainFrame from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const defaultPageToLoad = 3;
const key = 'mainFrame';
const icons = [
  { title: 'Pantry', icon: pantryIconSRC, urlValue: 0, url: 'pantry' },
  { title: 'Cookbook', icon: cookbookIconSRC, urlValue: 1, url: 'cookbook' },
  { title: 'Explore', icon: searchIconSRC, urlValue: 2, url: 'explore' },
  { title: 'Planner', icon: plannerSRC, urlValue: 3, url: 'planner' },
];

export function MainFrame() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  function renderCurrentPage() {
    return 'Works';
    // const { page } = this.state;
    // if (page === 0) {
    //   return <Pantry />;
    // } else if (page === 1) {
    //   return <div>1</div>;
    // } else if (page === 2) {
    //   return <Explore {...this.state} toggleSelected={this.toggleSelected.bind(this)} addToCart={this.addToCart.bind(this)}/>;
    // } else if (page === 3) {
    //   return <Planner selected={this.state.selected}/>;
    // }
  }

  function renderIcons() {
    return icons.map(function mapFn(icon, index) {
      return (
        <NavLink
          exact
          activeClassName="active"
          to={icon.url}
          className="Bottom-Panel-Icons pointer"
          key={index}
        >
          <div className="Bottom-Panel-Icon">
            <img id={icon.title} alt={icon.title} src={icon.icon} />
          </div>
          <div className="Bottom-Panel-Label">
            <label>{icon.title}</label>
          </div>
        </NavLink>
      );
    });
  }

  function renderCurrentPageHeader(state = { page: defaultPageToLoad }) {
    const { page } = state;
    let answer;
    if (page === 0) {
      answer = 'Pantry';
    } else if (page === 1) {
      answer = 'Cookbook';
    } else if (page === 2) {
      answer = 'Explore';
    } else if (page === 3) {
      answer = 'Planner';
    }
    return [
      <h1 className="page-header" key="pageHeader">
        {answer}
      </h1>,
      <div key="pageBorder" className="page-header-border" />,
    ];
  }

  return (
    <div className="application-container" key="application_container">
      {renderCurrentPageHeader.call(this)}
      <div className="application-frame">{renderCurrentPage.call(this)}</div>
      <div className="Bottom-Panel">
        <div className="Bottom-Panel-Icon-Container">
          {renderIcons.call(this)}
        </div>
      </div>
    </div>
  );
}

MainFrame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainFrame: makeSelectMainFrame(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MainFrame);
