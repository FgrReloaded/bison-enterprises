"use client"

import { useState, useEffect } from "react"
import CreateProductModal from "../modals/CreateProduct";
import ProductReview from "../modals/ProductReview";
import DeleteProductModal from "../modals/DeleteModal";
import NewBillBoard from "../modals/NewBillBoard";
import NewAdmin from "../modals/NewAdmin";
import NewBanner from "../modals/NewBanner";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div>
            <NewBillBoard />
            <DeleteProductModal />
            <ProductReview />
            <CreateProductModal />
            <NewAdmin />
            <NewBanner />
        </div>
    )
}

export default ModalProvider