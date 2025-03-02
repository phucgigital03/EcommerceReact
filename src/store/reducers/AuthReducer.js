
const initialState = {
    user: null,
    addresses: []
}

export const authReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT_USER":
            return {
                addresses: null,
                user: null
            }
        default:
            return state;
    }
}

