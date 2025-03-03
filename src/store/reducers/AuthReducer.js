
const initialState = {
    user: null,
    addresses: [],
    selectedUserAddress: null
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
                user: null
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
        default:
            return state;
    }
}

