import axios from "axios";
import UploadProducts from "./UploadProducts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

export default function AllProducts() {
  const [uploadProductsModal, setUploadProductsModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-products");
      const data = response.data;
      setAllProducts(data?.data || []);

    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, [])

  return (
    <div className="container mx-auto h-auto px-4 md:px-0 relative">
      <p className="bg-slate-200 text-sm mb-5 p-5 text-gray-500 cursor-pointer">Dashboard/All Products</p>

      <div className="bg-gray-50 p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">ALL PRODUCTS</h1>
          <button onClick={() => setUploadProductsModal(true)} className="border-2 border-gray-400 rounded-full py-1 px-3 text-base font-semibold hover:bg-black transition-all hover:text-white hover:border-white">Upload Products</button>
        </div>

        {/* Upload Products Modal */}
        {
          uploadProductsModal && (
            <UploadProducts onCloseProductModal={() => setUploadProductsModal(false)} fetchData={fetchAllProducts} />
          )
        }
      </div>

      {/* All products */}
      <div className="flex flex-wrap items-center text-center gap-10 py-5 pb-5 h-[calc(100vh-200px)] overflow-y-scroll">
        {
          allProducts.map((product, index) => {
            return (
              <ProductCard product={product} key={index} fetchData={fetchAllProducts} />
            )
          }
          )
        }
      </div>

    </div>
  )
}
