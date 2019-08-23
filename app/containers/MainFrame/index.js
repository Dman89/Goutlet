/**
 *
 * MainFrame
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMainFrame from './selectors';
import reducer from './reducer';
import saga from './saga';

const defaultPageToLoad = 3;
const key = 'mainFrame';

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
    </div>
  );
}

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
