import { GET_ORDERS } from "../actions/orders.action";

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
        default:
            return state
    }
}

export default OrdersReducer