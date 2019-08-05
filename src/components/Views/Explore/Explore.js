import React from 'react';
import Receipe from '../../Receipe';
import Card from '../../Card';

class Explore extends React.Component {
  componentWillMount() {
      this.propsLogic.call(this, this.props);
  }

  componentWillReceiveProps(newProps) {
    this.propsLogic.call(this, newProps);
  }

  propsLogic(props) {
    var singlePage = false;
    this.setState({ ...this.state, ...props, singlePage });
  }

  renderIfStatement() {
    if (this.state.singlePage) {
      const record = {};
      const ingredients = {};
      const steps = {};
      const percent = {};
      const master = {};
      return (
        <div className="col-xs-12">
          <Receipe className="Row-Frame mb-3" {...this.state} receipe={record} ingredients={ingredients} steps={steps} percent={percent} toggleSelected={this.props.toggleSelected.bind(this)} master={master}/>
        </div>
      );
    } else {
      return this.renderMasters.call(this, this.state.masters);
    }
  }

  renderMasters(masters = []) {
    return masters.map(function(master, index) {
      if (master.receipes.receipes.length) {
        return this.renderMore(master, true);
      } else {
        return '';
      }
    }, this);
  }

  renderMore(master, override) {
    var answer = this.renderReceipes(master.receipes.receipes, master);
    return !override ? (this.state.showMore[master.sys_id] ? answer : '') : answer;
  }

  renderReceipes(receipes = [], master = {}) {
    return receipes.map(function(receipe, index) {
      const ingredients = receipe.relatedRecords.ingredients.records;
      const steps = receipe.relatedRecords.steps.records;
      const { name = {}, percent = '', sys_id, prepTime, cookTime } = receipe.record;

      return (
        <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4" key={`${index}_${sys_id}`}>
          <Card id={sys_id} title={name.displayValue} type={"column"} prepTime={prepTime.displayValue} cookTime={cookTime.displayValue} percentage={percent} selected={this.props.selected[sys_id]} toggleSelected={this.props.toggleSelected}/>
        </div>
      );
    }, this);
  }

  render() {
    return (
        <div className="container-fluid mt-5">
          <div className="row">
            {this.renderIfStatement.call(this)}
          </div>
        </div>
    );
  }
}

export default Explore;
