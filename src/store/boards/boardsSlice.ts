import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBoard } from '../../components/main-route/board'

interface IError {
  message: string;
}

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
    try {
      const response = await fetch(`${baseURL}/boards`, options);
      const data = await response.json();
      return data

    } catch(error) {
      const errorMassage = ((error as IError).message)
      console.log(errorMassage);
      return rejectWithValue(errorMassage);
    }
  }
);

export const createBoard = createAsyncThunk<IBoard, IBoard, {rejectValue: string}>(
  'boards/createBoard',
  async function(board, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`${baseURL}/boards`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(board)
      });
      const data = await response.json();
      return data
    } catch(error) {
      const errorMassage = ((error as IError).message)
      return rejectWithValue(errorMassage);
    }
  }
);

export const deleteBoard = createAsyncThunk<string, string, {rejectValue: string}>(
  'boards/deleteBoard',
  async function(id, {rejectWithValue, dispatch}) {
    try {
      await fetch(`${baseURL}/boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return id;
    } catch(error) {
      const errorMassage = ((error as IError).message)
      return rejectWithValue(errorMassage);
    }     
  }
)

export interface BoardState {
  boards: Array<IBoard>,
  loading: boolean,
  error: boolean,
  currentId: string,
  newBoard: IBoard | null,
  message: string | undefined,
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: false,
  currentId: '',
  newBoard: {
    title: '',
    description: ''
  },
  message: undefined,
}

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    openboard(state, action) {
      state.currentId = action.payload;
    },
    openWindow(state, action) {
      state.currentId = action.payload;
      const modal = document.querySelector('.boardsModal')
      modal?.classList.remove('hidden')
      modal?.classList.add('flex')
    },
    closeWindow(state, action) {
      state.currentId = ''
      const modal = document.querySelector('.boardsModal')
      modal?.classList.add('hidden')
      modal?.classList.remove('flex')
    },
    resetBoard(state, action) {
      state.newBoard = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getBoards.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
      state.loading = false;
    })
    .addCase(getBoards.rejected, (state, action) => {
      state.error = true
      state.message = action.payload;
    })
    .addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload)
    })
    .addCase(createBoard.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(createBoard.fulfilled, (state, action) => {
      state.newBoard = action.payload;
      state.loading = false;
      state.boards.push(state.newBoard)
    })
    .addCase(createBoard.rejected, (state, action) => {
      state.error = true
      state.message = action.payload;
    })
  }
});

export const { openboard, openWindow, closeWindow, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;

