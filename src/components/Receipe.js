import React from 'react';

class Receipe extends React.Component {
  componentWillMount() {
    this.setState({
      ...this.props.receipe,
      ingredients: this.props.ingredients,
      steps: this.props.steps,
      percent: this.props.percent
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      ...newProps.receipe,
      ingredients: newProps.ingredients,
      steps: newProps.steps,
      percent: this.props.percent
    });
  }

  renderIngredients(ingredients = []) {
    return ingredients.map(function( ingredient, index ) {
      return (
        <p key={index}>
          {ingredient.amount.displayValue} {ingredient.measurement.displayValue} of {ingredient.name.displayValue}
        </p>
      );
    });
  }

  renderSteps(steps = []) {
    let stepNumber = 1;
    return steps.map(function( step, index ) {
      const { type = {}, title = {}, description = {} } = step;
      let _element = (<div key={index}/>);
      if (type.value === "4") {
        _element = (
          <div key={index}>
            <h4>{title.displayValue}</h4>
            <p>{description.displayValue}</p>
          </div>
        );
      } else if (type.value === "1") {
        _element = (
          <div key={index}>
            <h4>{title.displayValue}{title.value && description.value ? ' - ' : ''}<small>{description.displayValue}</small></h4>
          </div>
        );
      } else if (type.value === "2") {
        _element = (
          <div key={index}>
            {stepNumber}: <b>{title.displayValue}</b>{title.value && description.value ? ' - ' : ''}{description.displayValue}
          </div>
        );
        stepNumber++;
      } else if (type.value === "3") {
        _element = (
          <div key={index}>
            Note: <b>{title.displayValue}</b>{title.value && description.value ? ' - ' : ''}{description.displayValue}
          </div>
        );
      }
      return _element;
    });
  }

  toggle() {
      this.setState({ ...this.state, showMore: !this.state.showMore });
  }

  renderMore() {
    const { description = {}, author = {}, link = {}, date = {}, cookTime = {}, prepTime = {}, servingSize = {}, servings = {}, ingredients = {}, steps = {} } = this.state;
    var answer = (
      <div>
        <p>By {author.displayValue} at {date.displayValue || new Date().getTime()}</p>
        <p><small><a href={link.value}>{link.displayValue}</a></small></p>
        <p>Prep Time: {prepTime.displayValue}, Cook Time: {cookTime.displayValue}, Servings: {servings.displayValue}, Serving Size: {servingSize.displayValue}, </p>
        <p>{description.displayValue}</p>
        <h3>Ingredients:</h3>
        <div>
          {this.renderIngredients.call(this, ingredients)}
        </div>
        <h3>Steps:</h3>
        <div>
          {this.renderSteps.call(this, steps)}
        </div>
      </div>
    );
    return this.state.showMore ? answer : '';
  }

  render() {
    const { name = {}, percent = '', sys_id, prepTime, cookTime } = this.state;

    return (
      <div>
        <h2 onClick={this.toggle.bind(this)}>{name.displayValue}
          <div>
            <small>
              {this.state.master.displayValue} - {percent}%
            </small>
          </div>
        </h2>
        <div onClick={() => this.props.toggleSelected(sys_id)}>{this.renderSelectedIcon.call(this, sys_id)}</div>
        {this.renderMore.call(this)}
      </div>
    );
  }
}

export default Receipe;
