import React from 'react';
const thumbnailPlaceHolder = './imgs/thumbnail.svg';
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
        (this.renderStarSection.call(this)),
        (<p className="card-text mb-3" key={`${this.state.id}_description`}>
            {this.state.description || `Family receipe that has been passed down for generations.`}
        </p>)
      ];
  }

  renderStarSection() {
      if (this.state.isCardColumn) {
          return (
            <div className="d-flex justify-content-between align-items-center mb-2 text-muted" key={`${this.state.id}_star_section`}>
                <small className="mr-2">Prep Time: <strong>{`${this.state.prepTime || '0 Minutes'}`}</strong></small>
                <small className="mr-2">Cook Time: <strong>{`${this.state.coockTime || '0 Minutes'}`}</strong></small>
                <small className="mr-2"><strong>{`${this.state.percentage || '0'}%`}</strong> of items</small>
                {this.renderStars.call(this)}
            </div>
          );
      } else {
          return this.renderStars.call(this);
      }
  }

  renderStars() {
    return '';
    /* disabled for now
    return (
        <a href="#" className="text-warning">
            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
        </a>
    ); */
  }

  renderSelectedIcon() {
    let answer = 'far fa-heart ';
    if (this.state.selected) {
      answer = 'fas fa-heart selected ';
    }
    return <i className={answer + 'fa-2x'}></i>;
  }

  renderPreBody() {
    const id = this.state.id;
    if (this.state.isCardColumn) {
        return [
            (
                <div className="card-icon text-danger" key={`${id}_favaorite`} onClick={() => this.props.toggleSelected(id)}>
                    {this.renderSelectedIcon.call(this)}
                </div>
            ),
            (
                <img className="card-img-top" key={`${id}_img`} src={`${this.props.image || thumbnailPlaceHolder}`}/>
            )  
        ];
    } else {
        return (
            <img className="card-img-left" />
        );
    }
  }

  renderPostBody() {
    const id = this.state.id;
    if (this.state.isCardColumn) {
        return '';
    } else {
        return (
            <div className="card-img-right align-self-center ml-3 mr-3 text-danger" onClick={() => this.props.toggleSelected(id)}>
                {this.renderSelectedIcon.call(this)}
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
            </div>
            {this.renderPostBody.call(this)}
        </div>
    );
  }
}

export default Card;
