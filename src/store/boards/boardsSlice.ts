import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBoard } from '../../components/main-route/board'

export const baseURL = 'https://still-earth-24890.herokuapp.com';
let token: string | null;

let tokenString = localStorage.getItem('user')
tokenString ? token = JSON.parse(tokenString).token : token = null

const headers = new Headers({
  'Authorization': `Bearer ${token}`, 
})

const options = {
  method: 'GET',
  headers,
}

export const getBoards = createAsyncThunk<IBoard[], undefined, {rejectValue: string}>(
  'boards/getBoards',
  async function(_, {rejectWithValue}) {
    const response = await fetch(`${baseURL}/boards`, options);
    if (!response.ok) {
      return rejectWithValue('Not get');
    }
    const data = await response.json();
    console.log(data);
    return data
  }
);

export const deleteBoard = createAsyncThunk<string, string, {rejectValue: string}>(
  'boards/deleteBoard',
  async function(id, {rejectWithValue, dispatch}) {
    const response = await fetch(`${baseURL}/boards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      return rejectWithValue('Not found');
    }
    return id;
  }
)

interface BoardState {
  boards: Array<IBoard>,
  loading: boolean,
  error: null | string,
  currentId: null | string
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
  currentId: null
}

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
      state.loading = false;
    })
    .addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload)
    })
  }
});

export default boardSlice.reducer;