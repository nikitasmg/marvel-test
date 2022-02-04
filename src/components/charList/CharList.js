import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import propTypes from 'prop-types';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 1500,
    charEnded: false,
  };

  setLiRef = (el) => {
    this.myRef = el;
  };

  marvelService = new MarvelService();

  onUpdateChars = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    this.setState(({ offset, chars }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };

  componentDidMount() {
    this.onRequest();
  }

  onCharListLoading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onUpdateChars)
      .catch(this.onError);
  };
  render() {
    const { chars, loading, error, newItemsLoading, offset, charEnded } =
      this.state;
    const notFoundUrl =
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const charsCollection = chars.map((el) => {
      return (
        <li
          tabIndex={0}
          className='char__item'
          key={el.id}
          onClick={() => this.props.onCharSelected(el.id)}
          ref={this.setLiRef}
        >
          <img
            src={el.thumbnail}
            alt='abyss'
            className={el.thumbnail === notFoundUrl ? 'not-found' : null}
          />
          <div className='char__name'>{el.name}</div>
        </li>
      );
    });

    const errorMessage = error ? <ErrorMessage /> : null;

    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error) ? charsCollection : null;
    return (
      <div className='char__list'>
        <ul className='char__grid'>
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          disabled={newItemsLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
          className='button button__main button__long'
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: propTypes.func.isRequired,
};

export default CharList;
