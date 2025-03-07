
const initialState = {
    user: null,
    addresses: [],
    selectedUserAddress: null,
    clientSecret: null
}

export const authReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                user: action.payload
            }
        case "USER_ADDRESSES":
            return {
                ...state,
                addresses: action.payload
            }
        case "LOGOUT_USER":
            return {
                addresses: null,
                user: null,
                selectedUserAddress: null
            }
        case "SELECTED_USER_CHECKOUT_ADDRESS":
            return {
                ...state,
                selectedUserAddress: action.payload
            }
        case "CLEAR_SELECTED_USER_ADDRESS":
            return {
                ...state,
                selectedUserAddress: null
            }
        case "CLIENT_SECRET_STRIPE":
            return {
                ...state,
                clientSecret: action.payload
            }
        case "REMOVE_CLIENT_SECRET_STRIPE_ADDRESS":
            return {
                ...state,
                clientSecret: null,
                selectedUserAddress: null
            }
        default:
            return state;
    }
}

