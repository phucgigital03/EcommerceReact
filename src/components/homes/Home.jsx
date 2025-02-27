import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

function Home() {
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-4xl text-slate-800 font-bold">Products</h1>
          <span className="text-slate-800">
            Discover our handpicked selection of top-rated items just for you!
          </span>
        </div>
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex items-center justify-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                .slice(0, 4)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;
