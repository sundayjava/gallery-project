import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  role: string;
};

type Item = {
  id: number;
  user: User;
  createdAt: string;
  caption: string;
  description:string;
  thumbnails: {
    id:string;
    filename: string;
    url: string;
  }[];
  feedback: {
    userId: number;
    comment: string;
  }[];
  tag: string[];
  likes: number[];
  price: string;
  slash_price: string;
  views: number;
  rating: number;
};

type InitState = {
  loading: boolean;
  items: Item[];
  errer: string;
};

const initState: InitState = {
  loading: false,
  items: [],
  errer: "",
};

export const fetchItems = createAsyncThunk("item/fetchItems", () => {
  return fetch("http://localhost:2240/api/items/get/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.log("Error fetching items", error);
      throw error;
    });
});

const itemSlice = createSlice({
  name: "item",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.errer = "";
      }
    );
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.errer = action.error.message || "Something went wrong";
    });
  },
});

export default itemSlice.reducer;
