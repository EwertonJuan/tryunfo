import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="card">
        <span className="card-border" />
        <div className="upper-info">
          <span className="card-name" data-testid="name-card">{ cardName }</span>
          <span className="card-rare" data-testid="rare-card">{ cardRare }</span>
          { cardTrunfo
            ? <span className="trunfo" data-testid="trunfo-card">Super Trunfo</span>
            : '' }
        </div>

        <img src={ cardImage } alt={ cardName } data-testid="image-card" />

        <div className="lower-info">
          <p className="card-dscpt" data-testid="description-card">{ cardDescription }</p>
          <div className="attr">
            <p className="card-info">Ritmo de corrida</p>
            <span className="card-attr" data-testid="attr1-card">{ cardAttr1 }</span>
          </div>
          <div className="attr">
            <p className="card-info">Classificação</p>
            <span className="card-attr" data-testid="attr2-card">{ cardAttr2 }</span>
          </div>
          <div className="attr">
            <p className="card-info">Consistência</p>
            <span className="card-attr" data-testid="attr3-card">{ cardAttr3 }</span>
          </div>

        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
