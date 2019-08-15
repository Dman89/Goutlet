import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';
import Input from './components/Input';
import Explore from './components/Views/Explore';
import Planner from './components/Planner';
import Pantry from './components/Pantry';
import CartModal from './components/CartModal/index';
import BarcodeScanner from './components/BarcodeScanner';
import Camera from './components/Camera';
import { getAllReceipes } from "./services/receipes2";
import { getAllBlissLists } from "./services/blissList2";
import { createBlissTreat } from "./services/blissTreat";

class App extends Component {
  componentWillMount() {

    const { pathname } = this.props.location;
    let page = 2;
    if (pathname === '/pantry') {
      page = 0;
    } else if (pathname === '/cookbook') {
      page = 1;
    } else if (pathname === '/explore') {
      page = 2;
    } else if (pathname === '/planner') {
      page = 3;
    }

    this.setState({
      item: {
        label: '',
        quantity: '',
        measurement: '',
      },
      step: 0,
      page: page,
      receipes: [],
      percentages: {},
      editMode: {
        key: 'label',
        modes: ['Label', 'Quantity', 'Measurement']
      },
      showMore: {},
      selected: {},
      carted: {},
      showModal: false,
      contentLabel: 'Cart',
      carts: []
    });

    getAllReceipes().then((response) => response.json()).then((responseJSON) => {
       var { masters, masterKeys, percentages } = responseJSON.result;
       this.setState({
         masters,
         masterKeys,
         percentages
       });
    });

    getAllBlissLists().then(response => response.json()).then(json => {
      const { result } = json;
      if (result.valid) {
        this.setState({ ...this.state, carts: result.payload, showModal: true });
      }
    });
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
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

  toggleCarted(id) {
    const { carted } = this.state;
    carted[id] = carted[id] ? '' : id;
    this.setState({ ...this.state, carted });
    if (carted[id]) {
      createBlissTreat({ id }).then((response) => response.json()).then((responseJSON) => {
        console.log(responseJSON.result);
      }).catch((e) => {
        console.error(e);
        carted[id] = carted[id] ? '' : id;
        this.setState({ ...this.state, carted });
      });
    }
  }

  renderIcons() {
    var icons = [
      { title: 'Pantry', icon: 'pantry.svg', urlValue: 0, url: 'pantry' },
      { title: 'Cookbook', icon: 'cookbook.svg', urlValue: 1, url: 'cookbook' },
      { title: 'Explore', icon: 'search.svg', urlValue: 2, url: 'explore' },
      { title: 'Planner', icon: 'planner.svg', urlValue: 3, url: 'planner' },
    ];

    return icons.map(function(icon, index) {
      return (
        <NavLink exact activeClassName="active" to={icon.url} className="Bottom-Panel-Icons pointer" key={index}>
          <div className="Bottom-Panel-Icon">
            <img id={icon.title} alt={icon.title} src={'/imgs/' + icon.icon}></img>
          </div>
          <div className="Bottom-Panel-Label">
            <label>{icon.title}</label>
          </div>
        </NavLink>
      );

      // return (
      //   <div className="Bottom-Panel-Icons pointer" key={index} onClick={() => this.setPage.call(this, icon.urlValue)}>
      //     <div className="Bottom-Panel-Icon">
      //       <img id={icon.title} alt={icon.title} src={'/imgs/' + icon.icon}></img>
      //     </div>
      //     <div className="Bottom-Panel-Label">
      //       <label>{icon.title}</label>
      //     </div>
      //   </div>
      // );
    }, this);
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
      return <Explore {...this.state} toggleSelected={this.toggleSelected.bind(this)} toggleCarted={this.toggleCarted.bind(this)}/>;
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
      <div className="application-container" key={`application_container`}>
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
      <CartModal key={`cart_modal`}
        showModal={this.state.showModal}
        contentLabel={this.state.contentLabel}
        onRequestClose={this.handleCloseModal.bind(this)}
        handleCloseModal={this.handleCloseModal.bind(this)}
        carts={this.state.carts}
      />
    ];
  }
}

export default App;

/*
      <BarcodeScanner openCamera={this.openCamera.bind(this)} key={`barcode_scanner`}/>,
  <Receipe {...this.state} receipe={receipe} ingredients={ingredients} steps={steps}/>

function randomMan(max = 100, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

<button onClick={this.changeMode.bind(this)}>Change Mode</button>
<div>{this.renderInputs(this.state.editMode.modes)}</div>
*/
