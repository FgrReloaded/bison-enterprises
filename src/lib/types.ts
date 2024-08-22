export type VariantTypeWithVariant = {
    id: string;
    name: string;
    variants: {
        id: string;
        name: string;
    }[]
}


export type ProductVariant = {
    price: number,
    stock: number,
    variantId: string,
}[]

type VariantOption = string;
export interface Variant {
    [key: string]: VariantOption[];
}

export interface VariantDetails {
    price: number;
    stock: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string | null;
    images: string[];
    stock: number;
    isFeatured: boolean | null;
    isHide: boolean;
    variants: { variant: Variant; details: VariantDetails }[];
    createdAt: Date;
    updatedAt: Date;
}