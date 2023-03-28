import { GET_ORDERS,DELETE_ORDER } from "../actions/orders.action";

const initialState = {
    list: [],
}

const OrdersReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_ORDERS:
            return {
                ...state,
                list:action.payload,
            }
        case DELETE_ORDER:
            return {
                ...state,
                list: state.list.filter(item=>item.id!==action.orderId)
            }
        default:
            return state
    }
}

export default OrdersReducer