const initialState = {
  isLoading: false,
  errorMessage: null,

  categoryLoader: false,
  errorCategoryMessage: null,

  btnLoader: false,
  errorBtnLoader: null,
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
      };
    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case "CATEGORY_LOADER":
      return {
        ...state,
        categoryLoader: true,
        errorCategoryMessage: null
      };
    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoader: false,
        errorCategoryMessage: null
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        categoryLoader: false,
        errorCategoryMessage: action.payload
      };
    case "BTN_LOADER":
      return {
        ...state,
        btnLoader: true,
        errorBtnLoader: null,
      };
    case "BTN_LOADER_SUCCESS":
      return {
        ...state,
        btnLoader: false,
        errorBtnLoader: null,
      };
    case "BTN_LOADER_ERROR":
      return {
        ...state,
        btnLoader: false,
        errorBtnLoader: action.payload
      };
    default:
      return state;
  }
};
