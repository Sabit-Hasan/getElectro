import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function CategoryList() {
    const [category, setCategory] = useState([]);

    const fetchCategoryProduct = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/get-category");
            setCategory(response.data.data);
        } catch (error) {
            toast.error(error.message, { autoClose: 2000 });
        }
    }

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center gap-5 overflow-x-scroll scrollbar-none">
                {category.length === 0 ? (
                    Array(8).fill(0).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="mt-2 w-16 h-4 md:w-20 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                    ))
                ) : (
                    category.map((product, index) => (
                        <Link to={"product-category/" + product?.category} key={index}>
                            <div className="w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full overflow-hidden bg-slate-300 p-4 cursor-pointer">
                                <img className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all" src={product?.productImage[0]} alt={product?.category} />
                            </div>
                            <p className="text-center text-sm md:text-base capitalize cursor-pointer">{product?.category}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
