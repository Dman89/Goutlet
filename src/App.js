import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';
import Input from './components/Input';
import Explore from './components/Views/Explore';
import Planner from './components/Planner';
import Pantry from './components/Pantry';
import CartModal from './components/CartModal/index';
import Toaster from './components/Toaster/index';
import BarcodeScanner from './components/BarcodeScanner';
import Camera from './components/Camera';
import { getAllReceipes } from "./services/receipes2";
import { getAllBlissLists } from "./services/blissList2";
import { createBlissTreat, addBlissTreat } from "./services/blissTreat";

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
      carts: [],
      selectedCart: '',
      modalSelected: '',
      toaster: {
        title: 'Add to Cart',
        titleSmall: 'Succesful',
        message: 'Item was added to cart',
        open: true
      }
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
        const selectedCartArray = result.payload.filter((cart) => (cart.u_default === "1"));
        const selectedCart = selectedCartArray.length ? selectedCartArray[0] : { sys_id: '' };
        this.setState({ ...this.state, carts: result.payload, selectedCart: selectedCart.sys_id });
      }
    });
  }

  closeToaster(index) {
    this.setState({ ...this.state, toaster: { open: false } });
  }

  selectCartHandler(cartSysID) {
      this.setState({ selectedCart: cartSysID })
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal (state, props, calledFromHandler) {
    const newState = { ...this.state, showModal: false };
    const { selectedCart, modalSelected, carted } = this.state;
    const { quantity } = state;
    if (calledFromHandler) {
      newState.selectedCart = selectedCart;

      createBlissTreat({
        id: modalSelected,
        sys_id: modalSelected,
        fields: [
          { label: 'u_quantity', value: quantity },
          { label: 'u_record', value: modalSelected },
          { label: 'u_table', value: props.type },
          { label: 'parent', value: selectedCart }
        ]
      }).then(res => res.json()).then(response => {
        const { result } = response;
        console.log(result);
      }).catch((e) => {
        console.error(e);
        carted[selectedCart] = carted[selectedCart] ? '' : selectedCart;
        this.setState({ ...this.state, carted });
      });
    }
    this.setState(newState);
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

  addToCart(id) {
    const { carted } = this.state;
    carted[id] = id;
    this.setState({ ...this.state, carted });
    if (carted[id]) {
      this.setState({ ...this.state, modalSelected: id });
      this.handleOpenModal.call(this);
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
      return <Explore {...this.state} toggleSelected={this.toggleSelected.bind(this)} addToCart={this.addToCart.bind(this)}/>;
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
      <Toaster key="toaster" { ...this.state.toaster } closeToaster={this.closeToaster.bind(this)} />,
      <CartModal key={`cart_modal`}
        showModal={this.state.showModal}
        contentLabel={this.state.contentLabel}
        onRequestClose={this.handleCloseModal.bind(this)}
        handleCloseModal={this.handleCloseModal.bind(this)}
        carts={this.state.carts}
        selectedCart={this.state.selectedCart}
        selectCartHandler={this.selectCartHandler.bind(this)}
        type={`u_bliss_treat`}
        modalSelected={this.state.modalSelected}
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
