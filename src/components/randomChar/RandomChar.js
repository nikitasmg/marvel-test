import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

class Randomchar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };
  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };
  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;

    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className='randomchar'>
        {errorMessage}
        {spinner}
        {content}
        <div className='randomchar__static'>
          <p className='randomchar__title'>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className='randomchar__title'>Or choose another one</p>
          <button onClick={this.updateChar} className='button button__main'>
            <div className='inner'>try it</div>
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homePage, wiki } = char;
  const imgNotFound =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  return (
    <div className='randomchar__block'>
      <img
        src={thumbnail}
        alt='Random character'
        className={
          thumbnail === imgNotFound
            ? 'randomchar__img-not-found'
            : 'randomchar__img'
        }
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>
          {description ? description : 'Description is not found'}
        </p>
        <div className='randomchar__btns'>
          <a href={homePage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Randomchar;
