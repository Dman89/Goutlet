import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './styles.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  
class CartModal extends Component {
    componentWillMount() {
        this.propsLogic.call(this, this.props);
    }

    componentWillReceiveProps(newProps) {
      this.propsLogic.call(this, newProps);
    }

    propsLogic(props) {
        this.setState({
            quantity: props.quantity || 1,
            carts: props.carts || []
        });
    }

    add(num) {
        let { quantity } = this.state;
        quantity += num;
        this.setState({ ...this.state, quantity });
    }

    minus(num) {
        let { quantity } = this.state;
        quantity -= num;
        if (quantity > 0) {
            quantity = 0;
        }
        this.setState({ ...this.state, quantity });
    }

    renderCartOptions() {
        return this.state.carts.map((cart, index) => {
            console.log(cart)
            const { short_description, sys_id, u_wishlist, u_default } = cart;
            if (u_wishlist === "0") {
                return (
                    <option key={`${sys_id}_${index}`} value={sys_id} selected={u_default === true}>{short_description}</option>
                );
            }
        });
    }

    render() {
        return (
            <ReactModal 
            isOpen={this.props.showModal}
            contentLabel={this.props.modalTitle}
            onRequestClose={this.props.onRequestClose}
            shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
            style={customStyles}
            >
                <h3>
                    Cart
                </h3>
                <div className={`cart-select`}>
                    <select>
                        {this.renderCartOptions.call(this)}
                        <optgroup label="- - - - - - - -">
                            <option value="__wish_list__">Add to Wishlist</option>
                        </optgroup>
                        <optgroup label="- - - - - - - -">
                            <option value="__new__">Create New Cart</option>
                        </optgroup>
                    </select>
                </div>
                <div className={`cart-quantity`}>
                    <div className={`quantity-minus`} onClick={() => {this.minus.call(this, 1)}}>
                        -
                    </div>
                    <div className={`quantity-number`}>
                        {this.state.quantity}
                    </div>
                    <div className={`quantity-plus`} onClick={() => {this.add.call(this, 1)}}>
                        +
                    </div>
                </div>
                <button onClick={() => { this.props.handleCloseModal( ...this.state, ...this.props ); }} className={`cart-submit btn-primary`}>Add to Cart</button>
            </ReactModal>
        );
    }
}

export default CartModal;