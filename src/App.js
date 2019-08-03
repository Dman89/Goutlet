import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Receipe from './components/Receipe';
import Planner from './components/Planner';
import Pantry from './components/Pantry';
import BarcodeScanner from './components/BarcodeScanner';
import Camera from './components/Camera';
import { getAllReceipes } from "./services/receipes2";

class App extends Component {
  componentWillMount() {
    this.setState({
      item: {
        label: '',
        quantity: '',
        measurement: '',
      },
      step: 0,
      page: 2,
      receipes: [],
      percentages: {},
      editMode: {
        key: 'label',
        modes: ['Label', 'Quantity', 'Measurement']
      },
      showMore: {},
      selected: {}
    });

    getAllReceipes().then((response) => response.json()).then((responseJSON) => {
       var { masters, masterKeys, percentages } = responseJSON.result;
       this.setState({
         masters,
         masterKeys,
         percentages
       });
    });
  }

  changeMode(i) {
    const { editMode } = this.state;
    const x = i;
    editMode.key = editMode.modes[x].toLowerCase();
    this.setState({ ...this.state, editMode });
  }

  updateTheItem(e, key) {
    const { item } = this.state;

    item[key] = e.target.value;

    this.setState({ ...this.state, item});
  }

  setPage(val) {
    this.setState({ ...this.state, page: val })
  }

  renderInputs(inputs = []) {
    return inputs.map(function( label, index ) {
      return (
        <Input
          {...this.state}
          value={label}
          onChange={this.updateTheItem.bind(this)}
          key={label + '_' + index}
          onClick={this.changeMode.bind(this)}
          index={index}
        />
      )
    }, this);
  }

  renderReceipes(receipes = [], master = {}) {
    return receipes.map(function(receipe, index) {
      const ingredients = receipe.relatedRecords.ingredients.records;
      const steps = receipe.relatedRecords.steps.records;
      return (
        <div key={index} className="Row-Frame">
          <Receipe {...this.state} receipe={receipe.record} ingredients={ingredients} steps={steps} percent={this.state.percentages[receipe.record.sys_id]} toggleSelected={this.toggleSelected.bind(this)} master={master}/>
        </div>
      );
    }, this);
  }

  renderMasters(masters = []) {
    return masters.map(function(master, index) {
      // return (
      //   <div key={index} className="Row-Container">
      //     <div className="Row-Title-Container">
      //       <h2 className="Row-Title" onClick={() => this.toggle(master.sys_id)}>{master.name.displayValue}</h2>
      //       <p>{master.description.displayValue}</p>
      //     </div>
      //     <div>{this.renderMore(master)}</div>
      //   </div>
      // );
      return (
        <div key={index} className="Row-Container">
          <div>{this.renderMore(master, true)}</div>
        </div>
      );
    }, this);
  }

  toggle(id) {
    const { showMore } = this.state;
    showMore[id] = !showMore[id]
    this.setState({ ...this.state, showMore });
  }

  toggleSelected(id) {
    const { selected } = this.state;
    selected[id] = selected[id] ? '' : id;
    this.setState({ ...this.state, selected });
  }

  renderMore(master, override) {
    var answer = (
      <div>
        <div>{this.renderReceipes(master.receipes.receipes, master)}</div>
      </div>
    );
    return !override ? (this.state.showMore[master.sys_id] ? answer : '') : answer;
  }

  renderIcons() {
    var icons = [
      { title: 'Pantry', icon: 'pantry.svg', urlValue: 0 },
      { title: 'Cookbook', icon: 'cookbook.svg', urlValue: 1 },
      { title: 'Search', icon: 'search.svg', urlValue: 2 },
      { title: 'Planner', icon: 'planner.svg', urlValue: 3 },
    ];

    return icons.map(function(icon, index) {
      return (
        <div className="Bottom-Panel-Icons pointer" key={index} onClick={() => this.setPage.call(this, icon.urlValue)}>
          <div className="Bottom-Panel-Icon">
            <img id={icon.title} alt={icon.title} src={'/imgs/' + icon.icon}></img>
          </div>
          <div className="Bottom-Panel-Label">
            <label>{icon.title}</label>
          </div>
        </div>
      );
    }.bind(this), this);
  }

  renderCurrentPageHeader() {
    const { page } = this.state;
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
    return [<h1 className="page-header" key="pageHeader">{answer}</h1>, <div key="pageBorder" className="page-header-border"/>];
  }

  renderCurrentPage() {
    const { page } = this.state;
    if (page === 0) {
      return <Pantry />;
    } else if (page === 1) {
      return <div>1</div>;
    } else if (page === 2) {
      return <div>{this.renderMasters.call(this, this.state.masters)}</div>;
    } else if (page === 3) {
      return <Planner selected={this.state.selected}/>;
    }
  }

  openCamera() {
    this.setState({ ...this.state, showCameraModal: true, step: 0 });
  }

  renderCameraModal() {
    if (this.state.showCameraModal) {
      return <Camera type="barcode" step={this.state.step}/>
    }
    else return '';
  }

  render() {
    return [
      <div className="application-container">
        {this.renderCurrentPageHeader.call(this)}
        <div className="application-frame">
          {this.renderCurrentPage.call(this)}
        </div>
        <div className="Bottom-Panel">
          <div className="Bottom-Panel-Icon-Container">
            {this.renderIcons.call(this)}
          </div>
        </div>
      </div>,
      <BarcodeScanner openCamera={this.openCamera.bind(this)}/>,
      <div>{this.renderCameraModal.call(this)}</div>
    ];
  }
}

export default App;

/*
  <Receipe {...this.state} receipe={receipe} ingredients={ingredients} steps={steps}/>

function randomMan(max = 100, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

<button onClick={this.changeMode.bind(this)}>Change Mode</button>
<div>{this.renderInputs(this.state.editMode.modes)}</div>
*/
