import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/ProductReducer";
import { errorReducer } from "./reducers/ErrorReducer";
import { cartReducer } from "./reducers/CartReducer";
import { authReducer } from "./reducers/AuthReducer";

const user = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth"))
                : [];

const cartItems = localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems"))
                : [];

const initialState = {
    carts: {
        cart: cartItems
    },
    auth: {
        user: user
    }
}

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer
    },
    preloadedState: initialState
})

