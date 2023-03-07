import {createSlice} from "@reduxjs/toolkit";
import {logDOM} from "@testing-library/react";
import product from "../../components/products/Product";

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            const {products, search} = action.payload
            const tempProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()))

            state.filteredProducts = tempProducts
            console.log(action.payload);
        },
        SORT_PRODUCTS(state, action) {
            const {products, sort} = action.payload;
            let tempProducts = []
            if (sort === 'latest') {
                tempProducts = products;
            }
            if (sort === 'lowest') {
                tempProducts = products.slice().sort((a, b) => {
                    let hightPrices =[a.priceEuro || a.priceOne || a.priceTwo || a.pillowPrice40 || a.pillowPrice50 || a.pillowPrice60 || a.pillowPrice70]
                    let lowPrices = [b.priceEuro || b.priceOne || b.priceTwo || b.pillowPrice40 || b.pillowPrice50 || b.pillowPrice60 || b.pillowPrice70]

                    return hightPrices   - lowPrices;
                });
            }
            if (sort === 'highest') {
                tempProducts = products.slice().sort((a, b) => {
                    let hightPrices =[b.priceEuro || b.priceOne || b.priceTwo || b.pillowPrice40 || b.pillowPrice50 || b.pillowPrice60 || b.pillowPrice70]
                    let lowPrices = [a.priceEuro || a.priceOne || a.priceTwo || a.pillowPrice40 || a.pillowPrice50 || a.pillowPrice60 || a.pillowPrice70]

                    return hightPrices   - lowPrices;
                })

            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_CATEGORY(state,action){
            const {products,category} = action.payload
            let  tempProducts =[]

            if (category==="Всі"){
                tempProducts= products
            } else {
                tempProducts = products.filter((product)=>product.category===category)
            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_BRAND(state,action){
            const {products,brand} = action.payload
            let  tempProducts =[]

            if (brand==="Всі"){
                tempProducts= products
            } else {
                tempProducts = products.filter((product)=>product.brand===brand)
            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_PRICE(state,action){
           const {products,price }=action.payload
            let tempProducts = []
            tempProducts =products.filter((product)=>product.price<=price)

            state.filteredProducts=tempProducts
        }
    }
})


export const {FILTER_BY_SEARCH, SORT_PRODUCTS,FILTER_BY_CATEGORY,FILTER_BY_BRAND,FILTER_BY_PRICE} = filterSlice.actions

export const selectFilteredProduct = (state) => state.filter.filteredProducts


export default filterSlice.reducer

