const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null
}

export const cartReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "ADD_TO_CART":
            // eslint-disable-next-line no-case-declarations
            const productToAdd = action?.payload;
            // eslint-disable-next-line no-case-declarations
            const existingProductInCart = state.cart.find((product) => {
                return product.productId === productToAdd.productId
            })

            if(existingProductInCart){
                const updatedCart = state.cart.map((product)=>{
                    if(product.productId === productToAdd.productId){
                        return productToAdd;
                    }else{
                        return product;
                    }
                })
                return {
                    ...state,
                    cart: updatedCart
                };
            }else{
                const newCart = [...state.cart, productToAdd]
                return {
                    ...state,
                    cart: newCart
                }
            }
        case "REMOVE_ITEM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => 
                    item.productId !== action.payload.productId
                )
            }
        case "GET_USER_CART":
            return {
                ...state,
                cart: action.payload,
                cartId: action.cartId,
                totalPrice: action.totalPrice
            }
        case "CLEAR_CART_LOGOUT":
            return {
                ...state,
                // cart: [],
                cartId: null,
                totalPrice: 0
            }
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
                cartId: null,
                totalPrice: 0
            }
        case "UPDATE_PRICE_CART_ID":
            return {
                ...state,
                cartId: action?.payload?.cartId,
                totalPrice: action?.payload?.totalPrice
            }
        default:
            return state;
    }
}

