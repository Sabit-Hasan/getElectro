import axios from "axios";

const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;

const uploadImages = async (images) => {
    const formData = new FormData();
    formData.append("file", images);
    formData.append('upload_preset', "get_Electro");
    const response = await axios.post(url, formData);
    return response;
};

export default uploadImages;
