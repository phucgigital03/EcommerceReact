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
