import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import propTypes from 'prop-types';

const CharList = ({ onCharSelected }) => {
  const [chars, setChars] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { error, loading, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset).then(onUpdateChars);
  };

  const onUpdateChars = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newChars]);
    setNewItemsLoading((newItemsLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const notFoundUrl =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  const charsCollection = chars.map((el) => {
    return (
      <li
        tabIndex={0}
        className='char__item'
        key={el.id}
        onClick={() => onCharSelected(el.id)}
        // ref={setLiRef}
      >
        <img
          src={el.thumbnail}
          alt={el.name}
          className={el.thumbnail === notFoundUrl ? 'not-found' : null}
        />
        <div className='char__name'>{el.name}</div>
      </li>
    );
  });
  const gridItems = () => {
    return <ul className='char__grid'>{charsCollection}</ul>;
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;

  return (
    <div className='char__list'>
      {errorMessage}
      {spinner}
      {gridItems()}

      <button
        disabled={newItemsLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: propTypes.func.isRequired,
};

export default CharList;
