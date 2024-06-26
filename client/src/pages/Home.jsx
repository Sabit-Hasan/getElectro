import { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import CategoryProducts from "../components/CategoryProducts";

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading time. Adjust as necessary.

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <div>
                    <CategoryList />

                    <CategoryProducts />
                </div>
            )}
        </>
    );
}

