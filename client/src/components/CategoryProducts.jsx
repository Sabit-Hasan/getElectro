import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CategoryProducts() {
    const [data, setData] = useState([]);

    const fetchPopularProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/popular-products');

            setData(response.data.data);

            console.log(data)

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchPopularProducts();
    }, []);

    return (
        <>
            <div className="container mx-auto h-full px-4 md:px-0">
                {
                    data && data.map((product, index) => (
                        <div key={index} className="w-full lg:w-60 p-4 border flex items-start space-x-4">
                            <div>
                                {
                                    product.productImage && product.productImage.length > 0 && (
                                        <img
                                            src={product.productImage[0]}
                                            alt={`Product Image`}
                                            className="w-16 h-16 object-cover"
                                        />
                                    )
                                }
                            </div>
                            <div className="flex-1">
                                <p className="truncate w-full font-bold" title={product.productName}>{product.productName}</p>
                                <p className="capitalize">{product.category}</p>
                                <div className="mt-2">
                                    <p className="text-red-500 line-through">${product.price}</p>
                                    <p className="text-green-500">${product.sales != 0 ? (product.price - product.sales).toFixed(2) : product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
