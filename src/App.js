import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      attr1: '',
      attr2: '',
      attr3: '',
      image: '',
      rare: '',
      trunfo: false,
      cards: [],
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  checkAttributes = () => {
    const { attr1, attr2, attr3 } = this.state;
    const max = 90;
    return [attr1, attr2, attr3].every((attr) => attr >= 0 && attr <= max);
  }

  sumAttributes = () => {
    const { attr1, attr2, attr3 } = this.state;
    const max = 210;
    if (this.checkAttributes()) {
      const sum = [attr1, attr2, attr3]
        .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
      return (sum <= max);
    }
  }

  isSaveButtonDisabled = () => {
    const { name, description, attr1, attr2, attr3, image } = this.state;
    const areInputsEmpty = !name || !description || !image;
    const areAttrsEmpty = !attr1 || !attr2 || !attr3;
    const areAttrsValid = this.sumAttributes();
    return !!((areInputsEmpty || areAttrsEmpty || !areAttrsValid));
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    this.addCard();
  }

  addCard = () => {
    const newCard = this.state;
    this.setState((previous) => ({
      name: '',
      description: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      image: '',
      rare: '',
      trunfo: false,
      cards: [...previous.cards, newCard],
      nameFilter: '',
      rareFilter: '',
      trunfoFilter: false,
    }
    ));
  }

  hasTrunfo = () => {
    const { cards } = this.state;
    return cards.some(({ trunfo }) => trunfo === true);
  }

  deleteCard = (name) => {
    const { cards } = this.state;
    this.setState({
      cards: cards.filter((card) => card.name !== name),
    });
  }

  filterCard = ({ target }, name) => {
    // const value = (target.value === 'todas') ? '' : target.value;
    let value;
    if (target.value === 'todas') {
      value = '';
    } else if (target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }
    this.setState({ [name]: value });
  }

  renderCards = (card) => (
    <div key={ card.name } className="saved-card">
      <Card
        cardName={ card.name }
        cardDescription={ card.description }
        cardAttr1={ card.attr1 }
        cardAttr2={ card.attr2 }
        cardAttr3={ card.attr3 }
        cardImage={ card.image }
        cardRare={ card.rare }
        cardTrunfo={ card.trunfo }
      />
      <button
        type="button"
        className="btn btn-danger"
        data-testid="delete-button"
        onClick={ () => this.deleteCard(card.name) }
      >
        Excluir
      </button>
    </div>
  )

  render() {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rare,
      trunfo,
      cards,
      nameFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;

    return (
      <div>
        <main className="row no-gutters">
          <div className="col no-gutters">
            <div className="form-div">
              <h1>Tryunfo</h1>
              <Form
                cardName={ name }
                cardDescription={ description }
                cardAttr1={ attr1 }
                cardAttr2={ attr2 }
                cardAttr3={ attr3 }
                cardImage={ image }
                cardRare={ rare }
                cardTrunfo={ trunfo }
                onInputChange={ this.handleChange }
                isSaveButtonDisabled={ this.isSaveButtonDisabled() }
                onSaveButtonClick={ this.onSaveButtonClick }
                hasTrunfo={ this.hasTrunfo() }
              />
            </div>
          </div>
          <div className="col no-gutters">
            <div className="card-preview">
              <Card
                cardName={ name }
                cardDescription={ description }
                cardAttr1={ attr1 }
                cardAttr2={ attr2 }
                cardAttr3={ attr3 }
                cardImage={ image }
                cardRare={ rare }
                cardTrunfo={ trunfo }
              />
            </div>
          </div>
        </main>

        <section className="saved-cards">
          <label htmlFor="name-filter">
            Buscar carta
            {' '}
            <input
              type="text"
              data-testid="name-filter"
              id="name-filter"
              placeholder="Nome da carta"
              onChange={ (event) => this.filterCard(event, 'nameFilter') }
              disabled={ trunfoFilter }
            />
          </label>
          <select
            data-testid="rare-filter"
            onChange={ (event) => this.filterCard(event, 'rareFilter') }
            disabled={ trunfoFilter }
          >
            <option>
              todas
            </option>
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
          <label htmlFor="trunfo-filter">
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              id="trunfo-filter"
              onChange={ (event) => this.filterCard(event, 'trunfoFilter') }
            />
            Super Trunfo
          </label>

          <ul>
            { (trunfoFilter) ? cards.filter((card) => card.trunfo === trunfoFilter)
              .map((card) => this.renderCards(card))
              : cards.filter((card) => ((rareFilter === 'raro')
                ? card.rare === rareFilter : card.rare.includes(rareFilter)))
                .filter((card) => card.name.includes(nameFilter))
                .map((card) => this.renderCards(card)) }
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
