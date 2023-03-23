//import {CART} from '../../data/cart';
import { ADD_ITEM,REMOVE_ITEM,CONFIRM_CART } from '../actions/cart.action';

const initialState = {
    cartItems : [],
    total: 0,
}

const sumTotal = (list) => {
    const subTotal = list.map(item=>item.price*item.quantity);
    const total = subTotal.reduce((a,b)=>a+b,0);
    return total;
}

const CartReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            let updatedCart = []
            //console.log(state.cartItems)
            if(state.cartItems.find(item=>item.id === action.cartItem.id)){
                //console.log("Ya estaba en el carrito")
                updatedCart = state.cartItems.map(item=>{
                    if(item.id === action.cartItem.id) item.quantity++;
                    return item;
                })
            } else {
                //console.log("no estaba en el carrito")
                const newItem = {...action.cartItem,quantity:1 };
                updatedCart = [...state.cartItems, newItem]
            }
            //console.log(updatedCart)
            return {
                ...state,
                cartItems: updatedCart,
                total: sumTotal(updatedCart)
            }
        case REMOVE_ITEM:
            const filteredCart = state.cartItems.filter(item=>item.id !== action.cartItemId)
            return {
                ...state,
                cartItems:filteredCart,
                total: sumTotal(filteredCart)
            }
        default:
            return state;
    }
    
}

export default CartReducer