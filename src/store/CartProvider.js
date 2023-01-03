import { useReducer } from 'react';

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer =(state, action) => {
    if(action.tyle === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemindex = state.items.findIndex(
            item => item.id === action.item.id
        );   //findindex is an builtin function of js, which finds the index of the array
        
        const existingCartItem = state.items[existingCartItemindex];

        let updatedItems;

        if(existingCartItem)
        {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemindex] = updatedItem;    //overridng old item array with new item
        }
        else {
           // updatedItem = {...action.item };
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if(action.type === 'REMOVE') {
        const existingCartItemindex = state.items.findIndex(
            (item) => item.id === action.id
        );        //findindex is an builtin function of js, which finds the index of the array
        const existingItem = state.items[existingCartItemindex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;    //removing price once we press on '-' to reduce the count of product in cart
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);           //filter() returns an new array by applying conditions init
        }
        else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}    //reducing amount of 1 item while decreasing the count of that item(product) in cart
            updatedItems = [...state.items];
            updatedItems[existingCartItemindex] = updatedItem;
        }

        return {
            items: updatedItems,                                   //return total items at the end
            totalAmount: updatedTotalAmount                        //return total amount at the end
        }
    }

    return defaultCartState;
};


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)    //useReducer Returns an array exactly 2 elements

    const addItemToCartHandler = (item) => {
        dispatchCartAction({tyle: 'ADD', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;