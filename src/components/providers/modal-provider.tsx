"use client"

import { useState, useEffect } from "react"
import CreateProductModal from "../modals/CreateProduct";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div>
           <CreateProductModal />
        </div>
    )
}

export default ModalProvider