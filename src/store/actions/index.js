import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fecth product",
    });
  }
};

export const fetchCategoris = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "CATEGORY_ERROR",
      payload: error?.response?.data?.message || "Failed to fecth category",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const productStock = products.find((product) => {
      return product.productId === data.productId;
    });

    if (productStock) {
      const checkStock = productStock.quantity >= qty;
      if (checkStock) {
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...data, quantity: 1 },
        });
        toast.success(`${data?.productName} added successfully`);
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().carts.cart)
        );
      } else {
        toast.error(`Out of stock`);
      }
    } else {
      toast.error(`Product is not existing`);
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    // find profuct
    const { products } = getState().products;
    console.log(products);
    const productStock = products.find((item) => {
      return item.productId === data.productId;
    });

    if (productStock) {
      const checkStock = productStock.quantity >= currentQuantity + 1;

      if (checkStock) {
        const newQuantity = currentQuantity + 1;
        // update State at ItemContent
        setCurrentQuantity(newQuantity);

        // update State at Redux
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...data, quantity: newQuantity },
        });
        // update localStorage
        toast.success(`${data.productName} increased 1 quantity`);
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().carts.cart)
        );
      } else {
        //
        toast.error("Quantity Reached To Limit");
      }
    } else {
      //
      toast.error("Product is not existing");
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity, toast) => (dispatch, getState) => {
    // find profuct
    const { products } = getState().products;
    console.log(products);
    const productStock = products.find((item) => {
      return item.productId === data.productId;
    });

    if (productStock) {
      // update State at Redux
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...data, quantity: newQuantity },
      });
      // update localStorage
      toast.success(`${data.productName} decreased 1 quantity`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      //
      toast.error("Product is not existing");
    }
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_ITEM_CART",
    payload: data,
  });
  toast.success(`${data.productName} removed successfully`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      localStorage.setItem("auth", JSON.stringify(getState().auth?.user));
      reset();
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal server error"
      );
    } finally {
      setLoader(false);
    }
  };

export const logOutUser = (navigate, toast) => async (dispatch) => {
  try {
    // setLoader(true)
    const { data } = await api.post("/auth/signout");
    dispatch({
      type: "LOGOUT_USER",
    });
    localStorage.removeItem("auth");
    toast.success(`${data?.message || "Sign out successfully"}`);
    navigate("/login");
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.password ||
        "Internal server error"
    );
  }
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) =>
  async (dispatch, getState) => {
    // const {user} = getState().auth;
    try {
      dispatch({
        type: "BTN_LOADER",
      });
      if(addressId){
        const { data } = await api.put(`/addresses/${addressId}`, sendData);
        toast.success("Address updated successfully");
      }else{
        const { data } = await api.post("/addresses", sendData);
        toast.success("Address added successfully");
      }
      dispatch(getUserAddress())
      dispatch({
        type: "BTN_LOADER_SUCCESS",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
      dispatch({
        type: "BTN_LOADER_ERROR",
        payload: error?.response?.data?.message || "Internal server error"
      });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const getUserAddress = () => async (dispatch)=>{
  try {
    dispatch({type: "IS_FETCHING"})
    const { data } = await api.get("/user/addresses")
    dispatch({
      type: "USER_ADDRESSES",
      payload: data
    })
    dispatch({type: "IS_SUCCESS"})
  } catch (error) {
    console.log(error)
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch user address"
    })
  }
}

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch)=>{
  try {
    dispatch({type: "BTN_LOADER"})
    await api.delete(`/addresses/${addressId}`)
    dispatch(getUserAddress())
    dispatch({
      type: "CLEAR_SELECTED_USER_ADDRESS"
    })
    dispatch({type: "BTN_LOADER_SUCCESS"})
    toast.success("Address deleted successfully")
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message || "Internal server error")
    dispatch({
      type: "BTN_LOADER_ERROR",
      payload: error?.response?.data?.message || "Failed to delete user address"
    })
  }finally{
    setOpenDeleteModal(false)
  }
}

export const selectUserCheckoutAddress = (address)=>{
  return {
    type: 'SELECTED_USER_CHECKOUT_ADDRESS',
    payload: address
  }
}

export const selectCheckoutPayment = (payment)=>{
  return {
    type: 'SELECTED_CHECKOUT_PAYMENT',
    payload: payment
  }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState)=>{
  try {
    dispatch({type: "IS_FETCHING"})
    await api.post("/cart/create",sendCartItems)
    await dispatch(getUserCart())
    
    console.log("Done create or update user cart")
  } catch (error) {
    console.log(error)
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create user cart"
    })
  }
}

export const getUserCart = () => async (dispatch, getState)=>{
  try {
    dispatch({type: "IS_FETCHING"})
    const { data } = await api.get("/carts/user/cart");

    dispatch({
      type: 'GET_USER_CART',
      payload: data.products,
      cartId: data.cartId,
      totalPrice: data.totalPrice,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))

    dispatch({type: "IS_SUCCESS"})

    console.log("get user cart before")
  } catch (error) {
    console.log(error)
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to get user cart"
    })
  }
}
