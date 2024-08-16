"use client"

import { useState, useEffect } from "react"
import CreateProductModal from "../modals/CreateProduct";
import ProductReview from "../modals/ProductReview";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div>
            <ProductReview />
           <CreateProductModal />
        </div>
    )
}

export default ModalProvider