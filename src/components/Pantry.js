import React from 'react';
import { getAllPantries } from "../services/pantries2";

class Pantry extends React.Component {
  componentWillMount() {
    this.props = this.props || {};
    this.setState({
      ...this.props,
      list: []
    });

    getAllPantries().then((response) => response.json()).then((responseJSON) => {
      var result = responseJSON.result;
      const results = result.items.map(function(key) {
        return result[key];
      });

      this.setState({
        list: results
      });
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  renderIngredients() {
    return this.state.list.map(function(ingredient, index) {
      return (
        <div key={index}>
          {ingredient.displayValue} - {ingredient.amount.displayValue} {ingredient.measurement.displayValue}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderIngredients.call(this)}
      </div>
    );
  }
}

export default Pantry;
