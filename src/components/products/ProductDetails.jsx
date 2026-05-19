import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import api from "../../api/api";
import ProductCard from "../shared/ProductCard";

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  // Nhận dữ liệu product được truyền từ ProductCard qua cơ chế route state
  const product = location.state?.product;

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoadingSimilar(true);
        // Fetch 4 products
        const { data } = await api.get(`/public/products?pageSize=4`);
        const fetchedProducts = data.content || [];
        // Filter out the current product if it's there
        const filtered = fetchedProducts.filter(p => Number(p.productId) !== Number(productId)).slice(0, 4);
        setSimilarProducts(filtered);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoadingSimilar(false);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  // Cuộn lên đầu trang khi productId thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-xl text-gray-600 mb-4">Không tìm thấy thông tin sản phẩm!</p>
        <button 
          onClick={() => navigate('/products')}
          className="text-blue-500 hover:text-blue-700 underline flex items-center gap-2"
        >
          <FaArrowLeft /> Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  const isAvailable = product.quantity && Number(product.quantity) > 0;

  const addToCartHandler = () => {
    dispatch(addToCart(product, 1, toast));
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-blue-600 transition mb-6 flex items-center gap-2"
      >
        <FaArrowLeft /> Trở về
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto">
        {/* Cột trái: Ảnh sản phẩm */}
        <div className="md:w-1/2 p-8 flex justify-center items-center bg-gray-50">
          <img 
            src={product.image} 
            alt={product.productName} 
            className="object-contain w-full max-h-[400px] rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Cột phải: Thông tin sản phẩm */}
        <div className="md:w-1/2 p-8 flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.productName}</h1>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Mô tả sản phẩm:</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-4 mb-8">
              {product.specialPrice ? (
                <>
                  <span className="text-2xl font-bold text-red-600">
                    ${Number(product.specialPrice).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {product.discount && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold border border-red-200">
                      -{product.discount}%
                    </span>
                  )}
                </>
              ) : (
                <span className="text-3xl font-bold text-blue-600">
                  ${Number(product.price).toFixed(2)}
                </span>
              )}
            </div>

            <button
              disabled={!isAvailable}
              onClick={addToCartHandler}
              className={`
                w-full md:w-auto px-8 py-4 rounded-lg flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300
                ${isAvailable 
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              <FaShoppingCart />
              {isAvailable ? "Thêm vào giỏ hàng" : "Hết hàng"}
            </button>
          </div>
        </div>
      </div>

      {/* Phần sản phẩm gợi ý */}
      <div className="max-w-5xl mx-auto mb-16 mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Các sản phẩm gợi ý</h2>
        {loadingSimilar ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Đang tải sản phẩm gợi ý...</p>
          </div>
        ) : similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.productId}
                productId={p.productId}
                description={p.description}
                image={p.image}
                productName={p.productName}
                discount={p.discount}
                price={p.price}
                specialPrice={p.specialPrice}
                quantity={p.quantity}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Hiện không có sản phẩm gợi ý nào.</p>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;