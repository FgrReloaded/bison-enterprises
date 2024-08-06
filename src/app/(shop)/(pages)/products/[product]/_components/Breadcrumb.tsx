import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

import React from 'react'

const BreadcrumbProduct = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href={"/"}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator >/</BreadcrumbSeparator>
                <BreadcrumbItem>
                <Link href={"/products"}>Products</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator >/</BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage >Afro-Brazillian Coffee</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbProduct