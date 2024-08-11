"use client"

import { useState, useEffect } from "react"
import CreateProductModal from "../modals/CreateProduct";
import QuickView from "../modals/QuickView";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div>
            <QuickView />
           <CreateProductModal />
        </div>
    )
}

export default ModalProvider