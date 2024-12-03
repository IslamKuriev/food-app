import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { Product } from '../../interfaces/product.interface';

const ProductCard = (props: Product) => {
  const dispatch = useDispatch<AppDispatch>();
  const addToCart = () => {
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`product/${props.id}`} className={styles['link']}>
      <div className={styles['card']}>
        <div className={styles['head']} style={{ backgroundImage: `url(${props.image})` }}>
          <div className={styles['price']}>
            {props.price}&nbsp;
            <span className={styles['currency']}>₽</span>
          </div>
          <button title="В корзину" className={styles['add-to-cart']} onClick={addToCart}>
            <img src="/shopping.png" alt="Иконка шопинга" />
          </button>
          <div className={styles['rating']}>
            {props.rating}&nbsp;
            <img src="/star.png" alt="Иконка звезды" />
          </div>
        </div>
        <div className={styles['footer']}>
          <div className={styles['title']}>{props.name}</div>
          <div className={styles['description']}>{props.ingredients.join(', ')}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
