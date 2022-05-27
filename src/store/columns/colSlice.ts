import {
  createSlice,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
import { getCookie } from '../../helpers/cookie';
import { baseURL } from '../boards/boardsSlice';

interface IError {
  message?: string;
  response: {
    data: {
      message?: string;
    };
  };
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IColumnToAdd {
  title: string;
  boardId: string;
}

interface IColumnToDel {
  id: string;
  boardId: string;
}

export interface IColumnState {
  columns: IColumn[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  newColumn: IColumn;
}
// Get user from localstorage
// const user = JSON.parse(localStorage.getItem('user') || "");

const initialState: IColumnState = {
  columns: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  newColumn: {
    id: '',
    title: '',
    order: 1,
  },
};

export const getColumns = createAsyncThunk(
  'columns/fetchByBoardIdStatus',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const token = getCookie('user') || null;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        method: 'GET',
        headers,
      };
      const response = await fetch(
        `${baseURL}/boards/${boardId}/columns`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = (error as IError).message;
      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumnStatus',
  async (column: IColumnToDel, { rejectWithValue }) => {
    try {
      const token = getCookie('user') || null;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
      });

      const options = {
        method: 'DELETE',
        headers,
      };
      await fetch(
        `${baseURL}/boards/${column.boardId}/columns/${column.id}`,
        options
      );
      // const data = await response.json();
      // console.log('response data ', data);
      return column;
    } catch (error) {
      const errorMessage = (error as IError).message;
      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumnStatus',
  async (column: IColumnToAdd, { rejectWithValue }) => {
    try {
      const token = getCookie('user') || null;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });

      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: column.title,
        }),
      };
      const response = await fetch(
        `${baseURL}/boards/${column.boardId}/columns`,
        options
      );
      const data = await response.json();
      console.log('new column-->', data);
      return data;
    } catch (error) {
      const errorMessage = (error as IError).message;
      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const colSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    reset: (state) => {
      // state.isLoading = false;
      // state.isSuccess = false;
      // state.isError = false;
      // state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColumns.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.columns = action.payload;
      })
      .addCase(getColumns.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(addColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColumn.fulfilled, (state, action: AnyAction) => {
        state.newColumn = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.columns.push(state.newColumn);
      })
      .addCase(addColumn.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        console.log('state.columns before', state.columns);
        const { id } = action.payload;
        state.columns = state.columns.filter(
          (column) => column.id !== id
        );
        console.log('state.columns after', state.columns);
      });
  },
});

export const { reset } = colSlice.actions;
export default colSlice.reducer;
