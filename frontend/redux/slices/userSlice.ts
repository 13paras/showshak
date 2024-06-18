import { UserReducerInitialState } from "@/types/reducer.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      
    },
    resetUser: (state) => {
      state.loading = false;
      state.user = null;
    },
    getUser: (state) => {
      
    }
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
