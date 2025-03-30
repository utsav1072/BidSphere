import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  winner: false, // Initially, no winner
};

const winnerSlice = createSlice({
  name: "winner",
  initialState,
  reducers: {
    setWinner: (state, action) => {
      state.winner = action.payload; // Set the winner details
    },
    clearWinner: (state) => {
      state.winner = null; // Reset winner state
    },
  },
});

export const { setWinner, clearWinner } = winnerSlice.actions;
export default winnerSlice.reducer;
