import React from 'react';
import { getBarcode } from "../services/barcode2";

class AddIngredient extends React.Component {
  componentWillMount() {
    this.setState({
      ...this.props,
      product: {},
      status: 0
    });
  }

  componentDidMount() {
    this.fetchBarcode();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  fetchBarcode() {
    const { ingredient } = this.props;
    if (!ingredient || !ingredient.codeResult) return;
    getBarcode(ingredient).then((response) => response.json()).then((responseJSON) => {
      const { status, product } = responseJSON;
      this.setState({ ...this.props, status, product: { product_name: product.product_name } });
    }).catch((e) => alert('Error'));
  }

  renderIngredientDetails() {
    const { product, status } = this.state;
    if (status == 1) {
      return (
        <div className="add-ingredient-modal">
          <h2>{product.product_name ? product.product_name : 'Nope?'}</h2>
        </div>
      );
    } else {
      return (<div className="add-ingredient-modal">Loading...</div>);
    }
  }

  render() {
    console.log('dc13:', this.state.product);
    const { product } = this.state;
    return (
      <div>
        {this.renderIngredientDetails.call(this)}
      </div>
    );
  }
}

export default AddIngredient;
