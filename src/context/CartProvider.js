import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
    cartItems: []
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find(item => item.book_id === action.payload.book_id);
            if (existingItem) {
                return (
                    {
                        ...state,
                        cartItems: state.cartItems.map(item => item.book_id === action.payload.book_id ?
                            {
                                ...item,
                                quantity: item.quantity + 1
                            } : item
                        )
                    }
                )
            }
            else {
                return (
                    {
                        ...state,
                        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
                    }
                )
            }
        case 'REMOVE_ITEM':
            return (
                {
                    ...state,
                    cartItems: state.cartItems.filter(item => item.book_id !== action.payload.book_id)
                }
            )
        case 'UPDATE_ITEM':
            return (
                {
                    ...state,
                    cartItems: state.cartItems.map(item => item.book_id === action.payload.book_id ?
                        { ...item, quantity: action.payload.quantity } : item)
                }
            )
        case 'CLEAR CART':
            return initialState;
        default:
            return state;

    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch ] = useReducer(cartReducer, initialState);
    console.log(state.cartItems);

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>{children}</CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () =>{
    return useContext(CartContext);
}
