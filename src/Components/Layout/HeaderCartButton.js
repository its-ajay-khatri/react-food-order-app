import React from "react";
import { useContext, useEffect, useState } from "react";
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

     const [btnisHighLighted, setBtnisHighLighted]= useState(false);          //initially btnisHighLighted is false

    const cartCtx = useContext(CartContext);               //CartContext coming from store/cart-context.js, its an array
          
    const { items } = cartCtx

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;         //suppose 3 bread were added in cart so total amount will be 3*30(bread's amount)
    }, 0);  //reduce() methods transforms array of data into single value, 0 is starting value

    const btnClasses = `${styles.button} ${btnisHighLighted ? styles.bump : ''}`;     //if btnisHighLighted is true then add class bump

    useEffect(() =>{
        if(cartCtx.items.length === 0) {
            return;
        }
        setBtnisHighLighted(true);

        const timer = setTimeout(() => {
            setBtnisHighLighted(false);                  //automatically set btnisHighLighted value to false after 300 ms
        }, 300);

        return () => {
            clearTimeout(timer);                         //clearTimeout clears the old timer(sets to 0 ms or sec)
        };

    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
};

export default HeaderCartButton;