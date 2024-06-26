import { FiEdit } from "react-icons/fi";
import ProductCardEdit from "./ProductCardEdit";
import { useContext, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";



export default function ProductCard({ product, fetchData }) {
    const [editProduct, setEditProduct] = useState(false);
    return (
        <>
            <div>
                <div style={{ maxWidth: "200px" }} className="bg-slate-200 p-4 rounded cursor-pointer">
                    <div style={{ maxWidth: "200px", maxHeight: "200px" }}>
                        <img style={{ width: "200px", height: "200px", objectFit: "contain" }} src={product?.productImage[0]} />
                    </div>
                    <p className="text-ellipsis line-clamp-1">{product.productName}</p>
                    <div className="flex justify-center">
                        <p>Price: {product.price}</p><TbCurrencyTaka className="mt-1" />
                    </div>
                    <div className="flex justify-center">
                        <p>Sale: {product.sells}</p><TbCurrencyTaka className="mt-1" />
                    </div>
                    <FiEdit className="cursor-pointer" onClick={() => setEditProduct(true)} />
                </div>

                {
                    editProduct && (<ProductCardEdit product={product} onCloseProductModal={() => setEditProduct(false)} fetchData={fetchData} />)
                }
            </div>
        </>
    );
}