import {createSlice} from "@reduxjs/toolkit";

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
        },
        SORT_PRODUCTS(state, action) {
            const {products, sort} = action.payload;
            let tempProducts = []
            if (sort === 'latest') {
                tempProducts = products;
            }
            if (sort === 'lowest') {
                tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price
                });
            }
            if (sort === 'highest') {
                tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price
                })
            }
            console.log(tempProducts)
            state.filteredProducts = tempProducts

        }
    }
})


export const {FILTER_BY_SEARCH, SORT_PRODUCTS} = filterSlice.actions

export const selectFilteredProduct = (state) => state.filter.filteredProducts


export default filterSlice.reducer

