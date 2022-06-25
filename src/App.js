import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

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
    }
    ));
  }

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
    } = this.state;

    return (
      <div>
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
        />
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
    );
  }
}

export default App;
