import React from 'react';
import Receipe from '../Receipe';

class Explore extends React.Component {
  componentWillMount() {
      this.propsLogic.call(this, this.props);
  }

  componentWillReceiveProps(newProps) {
    this.propsLogic.call(this, newProps);
  }

  propsLogic(props) {
    this.setState({ ...this.state, ...props });
  }

  renderMasters(masters = []) {
    return masters.map(function(master, index) {
      console.log(master)
      // return (
      //   <div key={index} className="Row-Container">
      //     <div className="Row-Title-Container">
      //       <h2 className="Row-Title" onClick={() => this.toggle(master.sys_id)}>{master.name.displayValue}</h2>
      //       <p>{master.description.displayValue}</p>
      //     </div>
      //     <div>{this.renderMore(master)}</div>
      //   </div>
      // );
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
      return (
        <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
          <Receipe key={index} className="Row-Frame mb-3" {...this.state} receipe={receipe.record} ingredients={ingredients} steps={steps} percent={this.state.percentages[receipe.record.sys_id]} toggleSelected={this.props.toggleSelected.bind(this)} master={master}/>
        </div>
      );
    }, this);
  }

  render() {
    return (
        <div className="container-fluid mt-5">
          <div className="row">
            {this.renderMasters.call(this, this.state.masters)}
          </div>
        </div>
    );
  }
}

export default Explore;
