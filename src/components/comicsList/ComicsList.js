import { useState, useEffect } from 'react';
import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService();

  const [comics, setComics] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(220);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllComics(offset).then(onUpdateComics);
    console.log(comics);
  };

  const onUpdateComics = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }

    setComics((comics) => [...comics, ...newComics]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 8);
    setCharEnded(ended);
    console.log(newComics);
  };

  const items = comics.map((el, i) => {
    return (
      <li className='comics__item' key={i}>
        <Link to={`/comics/${el.id}`}>
          <img src={el.thumbnail} alt={el.title} className='comics__item-img' />
          <div className='comics__item-name'>{el.title}</div>
          <div className='comics__item-price'>{el.price}</div>
        </Link>
      </li>
    );
  });
  const elemGrid = () => {
    return <ul className='comics__grid'>{items}</ul>;
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      {elemGrid()}
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

export default ComicsList;
