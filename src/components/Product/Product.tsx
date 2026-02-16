import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import styles from './Product.module.css';
import { Headling } from '../Headling/Headling';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
const ProductComponent = () => {
  const data = useLoaderData() as { data: Product };
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams()
  const numberId = Number(id)

  const exitProduct = () => {
    navigate('/');
  };

  const addToCart = () => {
    dispatch(cartActions.add(numberId))
    navigate('/cart');
  };
  return (
    <>
      <Suspense fallback={'Загружаем...'}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <div className={styles['product']}>
              <div className={styles['head']}>
                <button className={styles['btn-exit']} onClick={exitProduct}>
                  <img src="/exit.svg" alt="Иконка выхода" />
                </button>
                <Headling>{data.name}</Headling>
                <Button className={styles['btn-to-cart']} onClick={addToCart}>
                  <img className={styles['cart-icon']} src="/shopping.png" alt="Иконка корзины" /> В
                  корзину
                </Button>
              </div>
              <div className={styles['body']}>
                <div>
                  <img className={styles['product-img']} src={data.image} alt="Еда" />
                </div>
                <div className={styles['info']}>
                  <div className={styles['price']}>
                    <div>Цена</div>
                    <span>{data.price}&nbsp;₽</span>
                  </div>
                  <div className={styles['rating']}>
                    {' '}
                    <div>Рейтинг</div>
                    <span className={styles['rating-numbers']}>
                      {data.rating} <img src="/star.png" alt="Иконка звезды" />
                    </span>
                  </div>
                  <div className="description">
                    <div>Состав : {data.ingredients.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default ProductComponent;
