import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Succes.module.css'
export function Succes () {
    const navigate = useNavigate()
    return (
    <div className={styles["succes"]}>
     <img src="https://www.washingtonpost.com/resizer/WZA859eqdl1br735VlartjQpvYo=/arc-anglerfish-washpost-prod-washpost/public/KO6XMOQNAEI63CHIYWG4HW5O4I.jpg" alt="Изоброжение пиццы" />
    <div className={styles["text"]}>Ваш заказ успешно оформлен</div>
    <Button appearence="big" onClick={() => navigate("/")}>Сделать новый</Button>
    </div>
    )
}