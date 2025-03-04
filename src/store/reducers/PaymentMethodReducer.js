const initialState = {
    paymentMethod: null
}

export const paymentMethodReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'SELECTED_CHECKOUT_PAYMENT':
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state;
    }
}

