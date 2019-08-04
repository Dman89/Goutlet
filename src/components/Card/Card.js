import React from 'react';
class Card extends React.Component {
  componentWillMount() {
      this.propsLogic.call(this, this.props);
  }

  componentWillReceiveProps(newProps) {
    this.propsLogic.call(this, newProps);
  }

  propsLogic(props) {
    const isCardColumn = props.type === 'column';
    const cardType = isCardColumn ? 'column' : 'row';
    const containerClassName = (isCardColumn ? `card--column` : `card--row flex-row`) + ` card mb-4 box-shadow`;
    const cardBodyClassName = `card-body ${(isCardColumn ? '' : 'd-flex flex-column align-items-start')}`
    this.setState({ ...this.state, ...props, containerClassName, cardBodyClassName, cardType, isCardColumn });
  }

  renderMainBodyOfCard() {
      return [
        (<h3 className="card--title" key={`${this.state.id}_title`}>
            <a className="text-dark" href="#">{this.state.title || `Taco Flavored Kisses`}</a>
        </h3>),
        (<div className="mb-2 text-muted card--title-small" key={`${this.state.id}_title_small`}>
            <a className="text-dark" href="#">{this.state.titleSmall || `By Jennifer Lopez`}</a>
        </div>),
        (<p className="card-text" key={`${this.state.id}_description`}>
            {this.state.description || `Family receipe that has been passed down for generations.`}
        </p>)
      ];
  }

  renderStarSection() {
      if (this.state.isCardColumn) {
          return (
            <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">9 mins</small>
                <a href="#" className="text-warning">
                    <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                </a>
            </div>
          );
      } else {
          return (
            <a href="#" className="text-warning">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
            </a>
          );
      }
  }

  renderPreBody() {
      const id = this.state.id;
    if (this.state.isCardColumn) {
        return [
            (
                <div className="card-icon text-danger" key={`${id}_favaorite`}>
                    <i className="fas fa-heart selected fa-2x"></i>
                </div>
            ),
            (
                <img className="card-img-top" key={`${id}_img`} />
            )  
        ];
    } else {
        return (
            <img class="card-img-left" />
        );
    }
  }

  renderPostBody() {
    if (this.state.isCardColumn) {
        return '';
    } else {
        return (
            <div class="card-img-right align-self-center ml-3 mr-3 text-danger ">
               <i class="fas fa-heart selected fa-2x"></i>
            </div>
        );
    }
  }

  render() {
    return (
        <div className={this.state.containerClassName}>
            {this.renderPreBody.call(this)}
            <div className={this.state.cardBodyClassName}>
                {this.renderMainBodyOfCard.call(this)}
                {this.renderStarSection.call(this)}
            </div>
            {this.renderPostBody.call(this)}
        </div>
    );
  }
}

export default Card;
