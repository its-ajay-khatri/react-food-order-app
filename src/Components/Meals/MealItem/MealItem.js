import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);                             //importing from Cart/cart.context.js
    const price = `$${props.price.toFixed(2)}`;
    
    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });                                               //addItem function is in CartProvider.js inside card-context object
    };

    return (
        <l1 className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart = {addToCartHandler}/>
            </div>
        </l1>
    )
};

export default MealItem;