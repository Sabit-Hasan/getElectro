import { RxCross2 } from "react-icons/rx";

export default function DisplayImages({ imagesUrl, onClose }) {
    return (
        <>
            <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
                <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
                    <div className="relative">
                        <div onClick={onClose} className="cursor-pointer m-2 absolute top-0 right-0 bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white">
                            <RxCross2 />
                        </div>
                    </div>
                    <div className="flex justify-center p-4 max-h-[80vh] max-w-[80vw]">
                        <img src={imagesUrl} className="w-30 h-30 object-contain" />
                    </div>
                </div>
            </div>
        </>
    );
}