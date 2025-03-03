const initialState = {
  isLoading: false,
  errorMessage: null,
  categoryLoader: false,
  btnLoader: false,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        categoryLoader: false,
        btnLoader: false,
      };
    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        categoryLoader: false,
        btnLoader: false,
        errorMessage: action.payload,
      };
    case "CATEGORY_LOADER":
      return {
        ...state,
        categoryLoader: true,
        errorMessage: null
      };
    case "BTN_LOADER":
      return {
        ...state,
        btnLoader: true,
        errorMessage: null,
      };
    default:
      return state;
  }
};
