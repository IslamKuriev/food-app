import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { loadState } from "./storage"

export const CART_PERSISTENS_STATE = "cartData"

export interface CartItem {
    id: number,
    count: number
}

export interface CartState {
    items: CartItem[]
 }
  
 const initialState: CartState = loadState<CartState>(CART_PERSISTENS_STATE)?? {
     items: []
 }
 
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    clean: (state) => {
        state.items = []
    },
    delete: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((i) => i.id !== action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
        const existed = state.items.find(i => i.id === action.payload)
        if(existed) {
            state.items.map(i => {
                if(i.id === action.payload && i.count) {
                        i.count -= 1
                }
               return i
               })
               return
        }
       state.items = state.items.filter((i) => i.id !== action.payload)
    },
     add: (state, action: PayloadAction<number>) => {
       const existed = state.items.find(i => i.id === action.payload)
       if(!existed) {
        state.items.push({ id: action.payload, count: 1 })
        return;
       }
       state.items.map(i => {
        if(i.id === action.payload) {
             i.count += 1
        }
       return i
       })
     }
    }  
})


export default cartSlice.reducer
export const cartActions = cartSlice.actions