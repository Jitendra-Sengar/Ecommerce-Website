import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState={
    cart:[],
    items:[],
    totalQuantity: 0,
    totalPrice: 0,
};

export const fetchProducts=createAsyncThunk("fetchProducts",async ()=>{
    const response=await fetch("https://fakestoreapi.com/products");
    return response.json()
})

export const CartSlice=createSlice({
    name:"cart",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    reducers:{
        addToCart:(state,action)=>{
            let find=state.cart.findIndex((item)=>item.id===action.payload.id);
            if(find>=0){
                state.cart[find].quantity+=1;

            }
            else{
                state.cart.push(action.payload)
            }
        },

        getCartTotal:(state)=>{
            let {totalQuantity,totalPrice}=state.cart.reduce((cartTotal,cartItem)=>{
                console.log("carttotal",cartTotal);
                console.log("cartitem",cartItem);
                const {price,quantity}=cartItem;
                console.log(price,quantity);
                const itemTotal=price*quantity;
                cartTotal.totalPrice+=itemTotal;
                cartTotal.totalQuantity+=quantity;
                return cartTotal

            },
        {
            totalPrice:0,
            totalQuantity:0,
        })
        state.totalPrice=parseInt(totalPrice.toFixed(2));
        state.totalQuantity=totalQuantity;
        },
        removeItem:(state,action)=>{
            state.cart=state.cart.filter((item)=>item.id !== action.payload)
        },
        increaseItemQuantity: (state,action)=>{
            state.cart=state.cart.map((item)=>{
                if(item.id===action.payload){
                    return {...item, quantity:item.quantity+1}
                }
                return item;
            })
        },
        decreaseItemQuantity: (state,action)=>{
            state.cart=state.cart.map((item)=>{
                if(item.id===action.payload){
                    return {...item, quantity:item.quantity-1}
                }
                return item;
            })
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.isLoading=true;
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload
        });
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            console.log("Error",action.payload);
            state.isError=true;
        })
    }
})


export const {addToCart, getCartTotal,removeItem,increaseItemQuantity,decreaseItemQuantity}  =  CartSlice.actions ; 

export default CartSlice.reducer;