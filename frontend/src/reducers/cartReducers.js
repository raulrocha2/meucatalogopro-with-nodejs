import { 
    ADD_TO_CART, 
    REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO,
    CART_CLEAR_ITEMS
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {}}, action) => {
    switch(action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            const itemExist = state.cartItems.find(i => i.product === item.product);

            if(itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        i => i.product === itemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] 
                }
            }
        
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        case SAVE_SHIPPING_INFO:
            return {

                ...state,
                shippingInfo: action.payload
        
            }
        
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
            
        default: 
            return state
    }
}