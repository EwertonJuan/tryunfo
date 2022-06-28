import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  hasTrunfoMessage = () => (
    <span data-testid="trunfo-input">
      Você já tem um Super Trunfo em seu baralho
    </span>
  )

  noTrunfo = (cardTrunfo, onInputChange) => (
    <label htmlFor="trunfo-input">
      <input
        type="checkbox"
        /* className="form-check" */
        data-testid="trunfo-input"
        id="trunfo-input"
        name="trunfo"
        checked={ cardTrunfo }
        onChange={ onInputChange }
      />
      {' '}
      Super Trunfo
    </label>
  )

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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form onSubmit={ onSaveButtonClick }>
        <label htmlFor="name-input">
          Nome:
          {' '}
          <input
            type="text"
            className="input-group mb-3"
            data-testid="name-input"
            id="name-input"
            name="name"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            type="textarea"
            className="input-group mb-3"
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr1-input">
          Atributo 1:
          {' '}
          <input
            type="number"
            className="input-group mb-3"
            data-testid="attr1-input"
            id="attr1-input"
            name="attr1"
            min="0"
            max="90"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr2-input">
          Atributo 2:
          {' '}
          <input
            type="number"
            className="input-group mb-3"
            data-testid="attr2-input"
            id="attr2-input"
            name="attr2"
            min="0"
            max="90"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr3-input">
          Atributo 3:
          {' '}
          <input
            type="number"
            className="input-group mb-3"
            data-testid="attr3-input"
            id="attr3-input"
            name="attr3"
            min="0"
            max="90"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="image-input">
          Imagem:
          {' '}
          <input
            type="text"
            className="input-group mb-3"
            data-testid="image-input"
            id="image-input"
            name="image"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="rare-input">
          Raridade:
          {' '}
          <select
            data-testid="rare-input"
            className="input-group mb-3"
            id="rare-input"
            name="rare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option>
              normal
            </option>
            <option>
              raro
            </option>
            <option>
              muito raro
            </option>
          </select>
        </label>

        {(hasTrunfo)
          ? this.hasTrunfoMessage() : this.noTrunfo(cardTrunfo, onInputChange) }

        <button
          type="submit"
          className="btn btn-light"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
