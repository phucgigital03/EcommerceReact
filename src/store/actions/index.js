import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch)=>{
    try{
        dispatch({type: 'IS_FETCHING'})
        const {data} = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({type: 'IS_SUCCESS'})
    }catch(error){
        dispatch({
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message || "Failed to fecth product"
        })
    }
}

export const fetchCategoris = () => async (dispatch)=>{
    try{
        dispatch({type: 'CATEGORY_LOADER'})
        const {data} = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
        })
        dispatch({type: 'CATEGORY_SUCCESS'})
    }catch(error){
        console.log(error)
        dispatch({
            type: 'IS_ERROR', 
            payload: error?.response?.data?.message || "Failed to fecth category"
        })
    }
}

export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    const { products } = getState().products;
    const productStock = products.find((product)=>{
        return product.productId === data.productId
    })

    if(productStock){
        const checkStock = productStock.quantity >= qty;
        if(checkStock){
            dispatch({
                type: 'ADD_TO_CART',
                payload: {...data, quantity: 1}
            })
            toast.success(`${data?.productName} added successfully`)
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
        }else{
            toast.error(`Out of stock`)
        }
    }else{
        toast.error(`Product is not existing`)
    }
}

export const increaseCartQuantity = (data,toast,currentQuantity,setCurrentQuantity) => 
    (dispatch,getState) => {
        // find profuct
        const { products } = getState().products;
        console.log(products)
        const productStock = products.find((item)=>{
            return item.productId === data.productId
        })

        if(productStock){
            const checkStock = productStock.quantity >= currentQuantity + 1;

            if(checkStock){
                const newQuantity = currentQuantity + 1;
                // update State at ItemContent
                setCurrentQuantity(newQuantity)

                // update State at Redux
                dispatch({
                    type: "ADD_TO_CART",
                    payload: {...data, quantity: newQuantity}
                })
                // update localStorage
                toast.success(`${data.productName} increased 1 quantity`)
                localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
            }else{
                // 
                toast.error("Quantity Reached To Limit")
            }
            
        }else{
            // 
            toast.error("Product is not existing")
        }
    }


export const decreaseCartQuantity = (data, newQuantity, toast) => 
    (dispatch,getState)=>{
        // find profuct
        const { products } = getState().products;
        console.log(products)
        const productStock = products.find((item)=>{
            return item.productId === data.productId
        })

        if(productStock){
            // update State at Redux
            dispatch({
                type: "ADD_TO_CART",
                payload: {...data, quantity: newQuantity}
            })
            // update localStorage
            toast.success(`${data.productName} decreased 1 quantity`)
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
        }else{
            // 
            toast.error("Product is not existing")
        }
    }


export const removeFromCart = (data, toast) => (dispatch, getState)=>{
    dispatch({
        type: 'REMOVE_ITEM_CART',
        payload: data
    })
    toast.success(`${data.productName} removed successfully`)
    localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
}


