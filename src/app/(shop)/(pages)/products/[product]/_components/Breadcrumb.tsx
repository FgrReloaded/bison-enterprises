import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"


const BreadcrumbProduct = ({name}:{name?: string}) => {
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
                    <BreadcrumbPage >{name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbProduct