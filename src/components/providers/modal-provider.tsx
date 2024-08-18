"use client"

import { useState, useEffect } from "react"
import CreateProductModal from "../modals/CreateProduct";
import ProductReview from "../modals/ProductReview";
import DeleteProductModal from "../modals/DeleteModal";
import CreateVariantModal from "../modals/VariantsModal";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div>
            <DeleteProductModal />
            <ProductReview />
           <CreateProductModal />
           <CreateVariantModal />
        </div>
    )
}

export default ModalProvider