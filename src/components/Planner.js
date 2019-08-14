import React from 'react';
import { getGroceryList } from "../services/groceries2";

class Planner extends React.Component {
  componentWillMount() {
    this.setState({
      ...this.props,
      list: []
    });
    var receipeKeys = Object.keys(this.props.selected) || [];
    var receipes = receipeKeys.map((key) => this.props.selected[key]).join(',');
    
    getGroceryList({ receipes }).then((response) => response.json()).then((responseJSON) => {
      const results = Object.keys(responseJSON.result).map(function(key) {
        return responseJSON.result[key];
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

  renderSubIngredients(master) {
    const ingredients = master.items;
    return ingredients.map((ingredient, index) => {
      const amount = master._items[ingredient.ingredient.value].total;
      return (
        <div key={index}>
          <div>{ingredient.displayValue}</div>
          <div>{amount} {ingredient.measurement.displayValue}</div>
        </div>
      );
    });
  }

  renderGroceryList() {
    return this.state.list.map((item, index) => {
      return (
        <div key={index}>
          <div>
            <h2>{item.displayValue}</h2>
          </div>
          <div>
            {this.renderSubIngredients.call(this, item)}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderGroceryList.call(this)}
      </div>
    );
  }
}

export default Planner;
