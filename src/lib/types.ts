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