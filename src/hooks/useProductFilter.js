import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { fetchProducts } from "../store/actions";


const useProductFilter = ()=>{
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        const params = new URLSearchParams();
        const currentPage = searchParams.get("page")  
                        ? Number(searchParams.get("page"))
                        : 1;
        params.set("pageNumber",currentPage - 1);
        const sizePage = searchParams.get("pageSize")
                        ? Number(searchParams.get("pageSize"))
                        : 5;
        params.set("pageSize", sizePage);

        const sortOrder = searchParams.get("sortOrder") || "asc";
        params.set("sortBy","price");
        params.set("sortOrder",sortOrder);
        
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        if(categoryParams){
            params.set("category",categoryParams)
        }

        if(keyword){
            params.set("keyword",keyword)
        }

        const queryString = params.toString();
        console.log("query string",queryString)

        dispatch(fetchProducts(queryString))
    },[dispatch,searchParams])
}

export default useProductFilter