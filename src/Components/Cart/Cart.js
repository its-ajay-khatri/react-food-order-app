import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);                 //CartContext comes from cart/cart-context.js file

    const[isCheckout, setIsCheckout] = useState(false);

    const CartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1})                  //when you click + icon, them amount will increase by 1
    };

    const orderHandler = (props) => {
        setIsCheckout(true);
        //props.onCloseCart;
    }

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;          //returns true if lengthh >0

    const modalActions =  <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onCloseCart}>Close</button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>       //if hasItems is true then it wil ldisplays button
    }
    
</div> 

    
    const cartItems = (
            <ul className={styles['cart-items']}>
                { cartCtx.items.map( (item) => (
                    <CartItem 
                        key={item.id} 
                        name={item.name} 
                        amount={item.amount} 
                        price={item.price} 
                        onRemove={CartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null,item)}
                    />
            ))}
        </ul>
    );

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
           { isCheckout && <Checkout onCancel={props.onCloseCart} /> }
           { !isCheckout && modalActions }
        </Modal>
    )
};

export default Cart;