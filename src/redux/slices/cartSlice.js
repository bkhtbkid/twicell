import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action) {
            state.cart.push(action.payload);
        },
        removeProduct(state, action) {
            state.cart = state.cart.filter(
                (obj) => obj.id !== action.payload.id
            );
        },
        updateProduct(state, action) {
            state.cart[action.payload.id] = action.payload;
        },
    },
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;

export default cartSlice.reducer;
