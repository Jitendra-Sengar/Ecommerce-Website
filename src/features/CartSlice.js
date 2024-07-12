import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
})

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            let find = state.data.findIndex((item) => item.id === action.payload.id);
            if (find >= 0) {
                state.data[find].quantity ? state.data[find].quantity += 1 : state.data[find].quantity = 1
                state.data[find].addedToCart = true
                state.totalQuantity += 1
            }
        },

        getCartTotal: (state) => {
            let totals = state.data.reduce((cartTotal, cartItem) => {
                let { price, quantity } = cartItem;
                if (isNaN(quantity)) quantity = 0;
                const itemTotal = price * quantity;
                cartTotal.totalPrice += itemTotal;
                cartTotal.totalQuantity += quantity;
                return cartTotal

            },
                {
                    totalPrice: 0,
                    totalQuantity: 0,
                })
            state.totalPrice = parseInt(totals.totalPrice.toFixed(2));
            state.totalQuantity = totals.totalQuantity;
        },
        removeItem: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        increaseItemQuantity: (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
        },
        decreaseItemQuantity: (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item;
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})


export const { addToCart, getCartTotal, removeItem, increaseItemQuantity, decreaseItemQuantity } = CartSlice.actions;

export default CartSlice.reducer;