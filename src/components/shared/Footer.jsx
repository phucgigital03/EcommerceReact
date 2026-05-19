import React from "react";
import { Link } from "react-router-dom";
import { RiFacebookCircleFill, RiTwitterXLine, RiInstagramLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
            <p className="text-gray-400">
              Cung cấp các sản phẩm chất lượng cao với giá cả hợp lý. Trải nghiệm mua sắm tuyệt vời nhất cùng chúng tôi.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Trang chủ</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition">Sản phẩm</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">Giới thiệu</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><RiFacebookCircleFill /></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><RiTwitterXLine /></a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl transition"><RiInstagramLine /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;