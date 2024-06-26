import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import productCategory from "../helper/productCategory";
import { HiUpload } from 'react-icons/hi';
import uploadImages from "../helper/uploadImages";
import DisplayImages from "../components/DisplayImages";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function ProductCardEdit({ onCloseProductModal, product, fetchData }) {
    const [productData, setProductData] = useState({
        ...product,
        productName: product?.productName,
        brandName: product?.brandName,
        category: product?.category,
        productImage: product?.productImage || [],
        description: product?.description,
        price: product?.price,
        sells: product?.sells
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fullImage, setFullImage] = useState("");
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const handleFileChange = async (e) => {
        const productImages = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...productImages]);

        try {
            const uploadedImages = await Promise.all(productImages.map(uploadImages));
            const imagesUrl = uploadedImages.map(imgUrl => imgUrl.data.secure_url);
            setProductData((prev) => ({
                ...prev,
                productImage: [...prev.productImage, ...imagesUrl]
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = (index) => {
        setSelectedFiles((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
        });
        setProductData((prev) => {
            const newProductImages = [...prev.productImage];
            newProductImages.splice(index, 1);
            return {
                ...prev,
                productImage: newProductImages
            };
        });
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === '' || parseFloat(value) >= 0 ? value : '';
        setProductData((prev) => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post("http://localhost:8000/api/update-product", productData, config);
        const data = response.data;

        if (data.success) {
            toast.success(response.data.message, { autoClose: 2000 });
            onCloseProductModal();
            fetchData();
            return;
        }

        if (data.error) {
            toast.error(response.data.message, { autoClose: 2000 });
            return;
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-y-auto text-left">
                <div className="flex items-center justify-center min-h-screen p-6">
                    <div className="bg-gray-200 shadow-lg rounded-lg p-3 max-w-md w-full">
                        <div className="relative">
                            <div onClick={onCloseProductModal} className="cursor-pointer m-2 absolute top-0 right-0 bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white">
                                <RxCross2 />
                            </div>
                        </div>
                        <h1 className="text-xl font-bold pb-5">EDIT PRODUCT</h1>

                        <form onSubmit={handleSubmit} className="form mx-auto w-full">
                            {/* Product Name */}
                            <div className="w-full my-3">
                                <label htmlFor="productName">Product Name:</label>
                                <input onChange={handleChange} value={productData.productName} className="rounded-md w-full py-2 pl-2 outline-none" type="text" name="productName" id="productName" placeholder="Product Name" required />
                            </div>

                            {/* Brand Name */}
                            <div className="w-full my-3">
                                <label htmlFor="brandName">Brand Name:</label>
                                <input onChange={handleChange} value={productData.brandName} className="rounded-md w-full py-2 pl-2 outline-none" type="text" name="brandName" id="brandName" placeholder="Brand Name" required />
                            </div>

                            {/* Category */}
                            <div className="w-full my-3">
                                <label htmlFor="category">Category:</label>
                                <select value={productData.category} name='category' onChange={handleChange} className="rounded-md w-full py-2 pl-2 outline-none" required >
                                    <option value="">Select Category</option>
                                    {productCategory && productCategory.map((item, index) => (
                                        <option value={item.value} key={index}>{item.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div className="w-full my-3">
                                <label htmlFor="price">Price:</label>
                                <input onChange={handleNumberChange} value={productData.price} className="rounded-md w-full py-2 pl-2 outline-none" type="number" name="price" id="price" placeholder="Price" required />
                            </div>

                            {/* Sells */}
                            <div className="w-full my-3">
                                <label htmlFor="sells">Sale:</label>
                                <input onChange={handleNumberChange} value={productData.sells} className="rounded-md w-full py-2 pl-2 outline-none" type="number" name="sells" id="sells" placeholder="Sells" required />
                            </div>

                            {/* Description */}
                            <div className="w-full my-3">
                                <label htmlFor="description">Description:</label> <br />
                                <textarea value={productData.description} onChange={handleChange} name="description" id="description" className="rounded-md w-full py-2 pl-2 outline-none" placeholder="Product Description" required ></textarea>
                            </div>

                            {/* Images */}
                            <div className="w-full my-3">
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-1 border bg-white px-3 py-3 rounded-md">
                                    <HiUpload className="w-5 h-5" />
                                    <span className="text-sm">Upload Images</span>
                                </label>
                                <div className="grid grid-cols-3 gap-4 p-4 overflow-y-auto">
                                    {productData.productImage.map((imageUrl, index) => (
                                        <div key={index}>
                                            <div className="relative">
                                                <div onClick={() => handleDelete(index)} className="cursor-pointer m-2 absolute top-0 right-0 bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white">
                                                    <RxCross2 size={10} />
                                                </div>
                                            </div>
                                            <img
                                                src={imageUrl}
                                                alt={`Product Image ${index + 1}`}
                                                className="rounded-md shadow-md w-full h-32 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setImageModalOpen(true)
                                                    setFullImage(imageUrl)
                                                }}
                                            />
                                        </div>
                                    ))}
                                    {selectedFiles.map((file, index) => (
                                        <div key={index + productData.productImage.length}>
                                            <div className="relative">
                                                <div onClick={() => handleDelete(index + productData.productImage.length)} className="cursor-pointer m-2 absolute top-0 right-0 bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white">
                                                    <RxCross2 size={10} />
                                                </div>
                                            </div>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Selected File ${index + 1}`}
                                                className="rounded-md shadow-md w-full h-32 object-cover cursor-pointer"
                                                onClick={() => {
                                                    setImageModalOpen(true)
                                                    setFullImage(URL.createObjectURL(file))
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <button className="px-4 py-2 bg-black rounded-md text-white hover:bg-slate-900">Update Product</button>
                            </div>
                        </form>
                    </div>

                    {/* Display image in full screen */}
                    {
                        imageModalOpen && (
                            <DisplayImages onClose={() => setImageModalOpen(false)} imagesUrl={fullImage}></DisplayImages>
                        )
                    }
                </div>
            </div>
        </>
    );
}
