import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserCart,
  getUserCartCheck,
  selectCheckoutPayment,
  updateCartWithPriceCartId,
} from "../../store/actions";
import { useEffect } from "react";

function PaymentMethod() {
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId, totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  async function handleCreateCart(cartItems) {
    //   const cartItems = [
    //     {productId: 3, quantity: 1},
    //     {productId: 4, quantity: 3},
    //     {productId: 5, quantity: 2},
    //   ]
    //   const cartItemsDB = [
    //     {productId: 3, quantity: 4},
    //   ]
    try {
      const { products: cartItemsDB, totalPrice: totalPriceDB, cartId: cartIdDB } = await dispatch(getUserCartCheck());
      const differenceBetweenObjects = (arr1, arr2) => {
        const set1 = new Set(arr1.map(item => `${item.productId}-${item.quantity}`));
        const set2 = new Set(arr2.map(item => `${item.productId}-${item.quantity}`));
        console.log("cartItems",set1)
        console.log("cartItemsDB",set2)
        return [
          ...arr1.filter(item => !set2.has(`${item.productId}-${item.quantity}`)),
          ...arr2.filter(item => !set1.has(`${item.productId}-${item.quantity}`))
        ];
      };
      const differences = differenceBetweenObjects(cartItems,cartItemsDB);
      console.log("differrent cartItem: ",differences);
      if (cartId === null) {
        dispatch(createUserCart(cartItems));
        return;
      }
      if(differences.length > 0){
        dispatch(createUserCart(cartItems));
        return;
      }
      if(differences.length === 0){
        if(!totalPrice || !cartId){
          console.log("updateCartWithPriceCartId")
          dispatch(updateCartWithPriceCartId(totalPriceDB,cartIdDB));
          return;
        }
      }

    } catch (error) {
      console.log(error);
      if (cartId === null && error?.response?.status === 404) {
        dispatch(createUserCart(cartItems));
      }
    }
  }

  useEffect(() => {
    if (cart.length > 0 && !errorMessage) {
        const cartItems = cart.map((item) => {
            return {
              productId: item.productId,
              quantity: item.quantity,
            };
          });
      handleCreateCart(cartItems);
      console.log("call when cart.length > 0 && !errorMessage");
    }
    console.log("call effect PaymentMethod");
  }, [cart, errorMessage, dispatch]);

  const handleChange = (e) => {
    dispatch(selectCheckoutPayment(e.target.value));
  };

  return (
    <div
      style={{ boxShadow: "0.3px 0.3px 4.4px 1.4px gray" }}
      className="rounded-md py-10 px-4 max-w-md mx-auto flex flex-col justify-center items-center"
    >
      <h1 className="mb-[12px] text-center text-2xl font-semibold text-gray-500">
        Select payment method
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
          <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default PaymentMethod;
