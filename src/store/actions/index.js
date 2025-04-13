import api from "../../api/api";
import { formatPriceVND } from "../../utils/formatPrice";
import { jwtDecode } from "jwt-decode";

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

const handleSuccessfulLogin = (
  dispatch,
  dataAuth,
  getState,
  reset,
  toast,
  navigate
) => {
  dispatch({
    type: "LOGIN_USER",
    payload: dataAuth,
  });
  localStorage.setItem("auth", JSON.stringify(getState().auth?.user));
  reset();
  toast.success("Login successfully");
  navigate("/");
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader, setStep, setJwtToken) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const { data: dataAuth, status } = await api.post("/auth/signin", sendData);

      // check 2FA
      if (status === 200 && dataAuth.jwtToken) {
        const decodedToken = jwtDecode(dataAuth?.jwtToken);
        setJwtToken(dataAuth.jwtToken);
        if (decodedToken?.is2faEnabled) {
          setStep(2);
        } else {
          handleSuccessfulLogin(
            dispatch,
            dataAuth,
            getState,
            reset,
            toast,
            navigate
          );
        }
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };

export const verify2FALogin =
  (toast, reset, navigate, setLoading, data, jwtToken) =>
  async (dispatch, getState) => {
    try {
      const code = data.code;
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("code", code);
      formData.append("jwtToken", jwtToken);

      const { data: dataAuth }  = await api.post("/auth/public/verify-2fa-login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // console.log(dataAuth)
      handleSuccessfulLogin(dispatch, dataAuth, getState, reset, toast, navigate);
    } catch (error) {
      console.error("2FA verification error", error);
      toast.error("Invalid 2FA code. Please try again.");
    } finally {
      setLoading(false);
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

export const handleLogOut = async () => {
  const { data } = await api.post("/auth/signout");
  return data;
};

export const logOutUser = (navigate, toast) => async (dispatch) => {
  try {
    // setLoader(true)
    const data = await handleLogOut();
    localStorage.removeItem("auth");
    dispatch({
      type: "LOGOUT_USER",
    });
    dispatch({
      type: "CLEAR_CART_LOGOUT",
    });
    console.log("logout done...");
    // navigate("/login");
    window.location.href = "/login";
  } catch (error) {
    console.log("logOut error:", error);
    if (error?.response?.status === 400) {
      localStorage.removeItem("auth");
      dispatch({
        type: "LOGOUT_USER",
      });
      dispatch({
        type: "CLEAR_CART_LOGOUT",
      });
      navigate("/login");
    }
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
      if (addressId) {
        const { data } = await api.put(`/addresses/${addressId}`, sendData);
        toast.success("Address updated successfully");
      } else {
        const { data } = await api.post("/addresses", sendData);
        toast.success("Address added successfully");
      }
      dispatch(getUserAddress());
      dispatch({
        type: "BTN_LOADER_SUCCESS",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
      dispatch({
        type: "BTN_LOADER_ERROR",
        payload: error?.response?.data?.message || "Internal server error",
      });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const getUserAddress = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/user/addresses");
    // test multiple requests when one done (the one above)
    await api.get("/user/addresses");
    // await api.get("/user/addresses");
    dispatch({
      type: "USER_ADDRESSES",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch user address",
    });
  }
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
      dispatch({ type: "BTN_LOADER" });
      await api.delete(`/addresses/${addressId}`);
      dispatch(getUserAddress());
      dispatch({
        type: "CLEAR_SELECTED_USER_ADDRESS",
      });
      dispatch({ type: "BTN_LOADER_SUCCESS" });
      toast.success("Address deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
      dispatch({
        type: "BTN_LOADER_ERROR",
        payload:
          error?.response?.data?.message || "Failed to delete user address",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const selectUserCheckoutAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
  return {
    type: "SELECTED_USER_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const selectCheckoutPayment = (payment) => {
  return {
    type: "SELECTED_CHECKOUT_PAYMENT",
    payload: payment,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart());

    console.log("Done create or update user cart");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create user cart",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/user/cart");

    dispatch({
      type: "GET_USER_CART",
      payload: data.products,
      cartId: data.cartId,
      totalPrice: data.totalPrice,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

    dispatch({ type: "IS_SUCCESS" });

    console.log("get user cart before");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to get user cart",
    });
  }
};

export const getUserCartCheck = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get("/carts/user/cart");
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const createStripeClientSecret =
  (totalPrice) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "IS_FETCHING",
      });
      const { data } = await api.post("/order/stripe-client-secret", {
        amount: Number(totalPrice) * 100,
        currency: "usd",
      });
      dispatch({
        type: "CLIENT_SECRET_STRIPE",
        payload: data,
      });
      localStorage.setItem("client-secret-stripe", JSON.stringify(data));
      dispatch({
        type: "IS_SUCCESS",
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message || "Failed to create client secret",
      });
    }
  };

export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      const { data } = await api.post("/order/users/payments/online", sendData);
      console.log(data);
      if (data) {
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret-stripe");
        dispatch({
          type: "CLEAR_CART",
        });
        dispatch({
          type: "REMOVE_CLIENT_SECRET_STRIPE_ADDRESS",
        });
        toast.success("Order accepted");
      } else {
        setErrorMessage("Payment failed, please try again");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Payment failed, please try again");
    }
  };

export const updateCartWithPriceCartId = (totalPrice, cartId) => {
  return {
    type: "UPDATE_PRICE_CART_ID",
    payload: {
      totalPrice,
      cartId,
    },
  };
};

export const vnpayPaymentConfirmation =
  (orderId, setStatus, setCurrentOrder, amount) =>
  async (dispatch, getState) => {
    try {
      const { data } = await api.get(`/order/${orderId}/status`);
      console.log(data);
      if (data) {
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret-stripe");
        dispatch({
          type: "CLEAR_CART",
        });
        dispatch({
          type: "REMOVE_CLIENT_SECRET_STRIPE_ADDRESS",
        });
        setCurrentOrder(data);
        setStatus({
          success: true,
          message: `Payment successful! Amount: ${formatPriceVND(amount)}`,
        });
      } else {
        setStatus({
          success: false,
          message: "Payment failed. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      setStatus({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }
  };
