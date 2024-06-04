import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the products slice
const initialState = {
  products: [],
  filteredProducts: [],
  categorySelected: null,
  sortOption: "Recommended",
  searchTerm: "",
  totalQuantity: 0,
};

// Create a product slice with reducers
const productSlice = createSlice({
  name: "products", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to update products and filteredProducts arrays
    fetchProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    // Reducer to select a category and filter products accordingly
    selectCategory: (state, action) => {
      state.categorySelected = action.payload;
      const category = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.category === category
      );
    },
    // Reducer to select a sorting option and sort products accordingly
    selectSortBy: (state, action) => {
      state.sortOption = action.payload;
      if (state.sortOption === "Price : High to Low") {
        state.filteredProducts = state.filteredProducts.sort(
          (a, b) => b.price - a.price
        );
      } else if (state.sortOption === "Price : Low to High") {
        state.filteredProducts = state.filteredProducts.sort(
          (a, b) => a.price - b.price
        );
      } else if (state.sortOption === "Customer Rating") {
        state.filteredProducts = state.filteredProducts.sort(
          (a, b) => b.rating.rate - a.rating.rate
        );
      }
    },
    // Reducer to clear selected category and reset filtered products
    selectClearAll: (state) => {
      state.filteredProducts = state.products;
      state.categorySelected = null;
    },
    // Reducer to set the search term and filter products accordingly
    setSearchTerm: (state, action) => {
      const searchInput = action.payload || "";
      state.searchTerm = searchInput;

      if (searchInput.trim() === "") {
        state.filteredProducts = state.categorySelected
          ? (state.filteredProducts = state.products.filter(
              (product) => product.category === state.categorySelected
            ))
          : state.products;
      } else {
        const searchLower = searchInput.toLowerCase();
        state.filteredProducts = state.filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchLower)
        );
      }
    },
    // Reducer to set the total quantity of items in the bag
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
  },
});

// Export action creators and reducer from the product slice
export const {
  fetchProducts,
  selectCategory,
  selectSortBy,
  selectClearAll,
  setSearchTerm,
  setTotalQuantity,
} = productSlice.actions;
export default productSlice.reducer;
