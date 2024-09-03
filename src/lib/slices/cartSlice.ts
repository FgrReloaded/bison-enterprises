// store/slices/cartSlice.ts

import { Product } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    product: Product;
    quantity: number;
    variant: Record<string, any> | null;
    createdAt: string;
    updatedAt: string;
}

interface CartState {
    id: string;
    customerId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

const initialState: CartState = {
    id: '',
    customerId: '',
    items: [],
    createdAt: '',
    updatedAt: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<CartState>) {
            return action.payload;
        },
        addItem(state, action: PayloadAction<Omit<CartItem, 'id' | 'cartId' | 'createdAt' | 'updatedAt'>>) {
            const { productId, variant } = action.payload;
            const existingItemIndex = state.items.findIndex(
                item => item.productId === productId && 
                        JSON.stringify(item.variant) === JSON.stringify(variant)
            );

            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += action.payload.quantity;
                state.items[existingItemIndex].updatedAt = new Date().toISOString();
            } else {
                state.items.push({
                    id: crypto.randomUUID(),
                    cartId: state.id,
                    ...action.payload,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                });
            }
            state.updatedAt = new Date().toISOString();
        },
        removeItem(state, action: PayloadAction<{ productId: string; variant: Record<string, any> | null }>) {
            state.items = state.items.filter(
                item => !(item.productId === action.payload.productId && 
                          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant))
            );
            state.updatedAt = new Date().toISOString();
        },
        clearCart(state) {
            state.items = [];
            state.updatedAt = new Date().toISOString();
        },
        updateItemQuantity(
            state,
            action: PayloadAction<{ productId: string; variant: Record<string, any> | null; quantity: number }>
        ) {
            const itemIndex = state.items.findIndex(
                item => item.productId === action.payload.productId &&
                        JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
            );
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = action.payload.quantity;
                state.items[itemIndex].updatedAt = new Date().toISOString();
            }
            state.updatedAt = new Date().toISOString();
        },
        
    },
});

export const {
    setCart,
    addItem,
    removeItem,
    clearCart,
    updateItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;