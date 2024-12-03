import { useDispatch, useSelector } from 'react-redux';
import { Headling } from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItems from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELEVERY_FEE = 169;

const Cart = () => {
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const total = items
    .map((i) => {
      const product = cartProduct.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const getMenu = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getMenu(i.id)));
    setCartProduct(res);
  };
  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        product: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    dispatch(cartActions.clean());
    navigate('/succes');
  };
  useEffect(() => {
    loadAllItems();
  }, [items]);
  return (
    <>
      <Headling className={styles['headling']}>Корзина</Headling>
      {items.map((i) => {
        const product = cartProduct.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItems key={product.id} count={i.count} {...product} />;
      })}
      <div className={styles['line']}>
        <div className={styles['text']}>Итог</div>
        <div className={styles['price']}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Доставка</div>
        <div className={styles['price']}>
          {DELEVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>
          Итого <span className={styles['total-count']}>({items.length})</span>
        </div>
        <div className={styles['price']}>
          {total + DELEVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <div className={styles['checkout']}>
        <Button onClick={checkout} disabled={items.length === 0} appearence="big">
          Оформить
        </Button>
      </div>
    </>
  );
};

export default Cart;
