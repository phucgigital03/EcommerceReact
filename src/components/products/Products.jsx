

import { useEffect } from 'react'
import ProductCard from '../shared/ProductCard.jsx';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoris } from '../../store/actions';
import Filter from './Filter.jsx';
import useProductFilter from '../../hooks/useProductFilter.js';
import Loader from '../shared/Loader.jsx';
import Paginations from '../shared/Paginations.jsx';

function Products() {
    const { isLoading,errorMessage } = useSelector(state => state.errors)
    const { products,categories,pagination } = useSelector(state => state.products)
    const dispatch = useDispatch();

    useProductFilter();

    useEffect(()=>{
        dispatch(fetchCategoris())
    },[dispatch])

    // console.log(products)

    return (
        <div className='lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto'>
            <Filter categories={categories ? categories : []} />
            {isLoading ? (
                <Loader text={"Product is loading..."}/>
            )
            : errorMessage ? (
                <div className='flex items-center justify-center h-[200px]'>
                    <FaExclamationTriangle className='text-slate-800 text-3xl mr-2'/>
                    <span className='text-slate-800 text-lg font-medium'>
                        {errorMessage}
                    </span>
                </div>
            )
            : (
                <div className='min-h-[700px]'>
                    <div className='pb-6 pt-14 grid 2xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6'>
                        {products && 
                            products.map((item,i)=> <ProductCard key={i} {...item}/>)
                        }
                    </div>
                </div>
            )
            }
            <div className='flex justify-center pt-10'>
                <Paginations 
                    numberOfPage={pagination?.totalPages}
                    totalElements={pagination?.totalElements}
                />
            </div>
        </div>
    )
}

export default Products