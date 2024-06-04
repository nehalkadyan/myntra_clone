import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the user slice
const initialState = {
  currentUser: null, // Initially, no user is logged in
};

// Create a user slice with reducers
const userSlice = createSlice({
  name: "user", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to update currentUser when a user signs in successfully
    signInSuccessfull: (state, action) => {
      state.currentUser = action.payload; // Update currentUser with user data
    },
    // Reducer to reset currentUser when a user logs out successfully
    logoutSuccessful: (state) => {
      state.currentUser = null; // Reset currentUser to null
    },
  },
});

// Export action creators and reducer from the user slice
export const { signInSuccessfull, logoutSuccessful } = userSlice.actions;
export default userSlice.reducer;
