import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import styles from "./Product.module.css";
import { Headling } from "../Headling/Headling";
import Button from "../Button/Button";
const ProductComponent = () => {
  const data = useLoaderData() as { data: Product };
  // const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const exitProduct = () => {
    navigate("/");
  };
  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    //   dispatch(cartActions.add(props.id))
    navigate("/cart");
  };
  return (
    <>
      <Suspense fallback={"Загружаем..."}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <div className={styles["product"]}>
              <div className={styles["head"]}>
                <button className={styles["btn-exit"]} onClick={exitProduct}>
                  <img src="/exit.svg" alt="Иконка выхода" />
                </button>
                <Headling>{data.name}</Headling>
                <Button className={styles["btn-to-cart"]} onClick={addToCart}>
                  <img
                    className={styles["cart-icon"]}
                    src="/shopping.png"
                    alt="Иконка корзины"
                  />{" "}
                  В корзину
                </Button>
              </div>
              <div className={styles["body"]}>
                <div>
                  <img
                    className={styles["pizza-img"]}
                    src={data.image}
                    alt="Пицца"
                  />
                </div>
                <div className={styles["info"]}>
                  <div className={styles["price"]}>
                    <div>Цена</div>
                    <span>{data.price}&nbsp;₽</span>
                  </div>
                  <div className={styles["rating"]}>
                    {" "}
                    <div>Рейтинг</div>
                    <span className={styles["rating-numbers"]}>
                      {data.rating} <img src="/star.png" alt="Иконка звезды" />
                    </span>
                  </div>
                  <div className="description">
                    <div>Состав : {data.ingredients.join(", ")}</div>
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
