import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  TaskAddProps, TaskShowProps } from "../../components/interfaces";
import { getCookie } from '../../helpers/cookie';
import { IError } from "../config";

export const baseURL = 'https://still-earth-24890.herokuapp.com';

export const getAllAboutBoard = createAsyncThunk<BoardColTask, string, {rejectValue: string}>(
  'tasks/gettasks',
  async function(id, {rejectWithValue}) {
    try {
      const token = getCookie('user') || null;
      const response = await fetch(`${baseURL}/boards/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data
    } catch(error) {
      const errorMassage = ((error as IError).message)
      return rejectWithValue(errorMassage);
    }
  }
);


export const createTask = createAsyncThunk<TaskShowProps, TaskAddProps, {rejectValue: string}>(
  'tasks/createtask',
  async function (task, { rejectWithValue, dispatch }) {
    try {
      const token = getCookie('user') || null;

      const response = await fetch(`${baseURL}/boards/${task.boardId}/columns/${task.colId}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task.task),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const deleteTask = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'boards/deleteBoard',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const token = getCookie('user') || null;

      await fetch(`${baseURL}/boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export interface TaskState {
  tasks: Array<TaskShowProps>,
  loading: boolean,
  error: boolean,
  boardId: string,
  colId: string,
  newTask: TaskShowProps | null,
  message: string | undefined,
  colTasks: BoardColTask
}

interface BoardColTask {
  id: string,
  title: string,
  description: string,
  columns: Array<ColumnTaskProps>
}

export interface ColumnTaskProps {
  id: string,
  title: string,
  order: number,
  tasks: Array<TaskShowProps>,
}


const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: false,
  boardId: '',
  colId: '',
  newTask: {
    title: '',
    description: '',
    done: false,
    order: 0,
    userId: '',
    boardId: '',
    columnId: '',
    files: [],
    id:''
  },
  message: undefined,
  colTasks: {
    id: '',
    title: '',
    description: '',
    columns: []
  }
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAboutBoard.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllAboutBoard.fulfilled, (state, action) => {
        state.colTasks = action.payload;
        state.loading = false
      })
      .addCase(getAllAboutBoard.rejected, (state, action) => {
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.newTask = action.payload;
        state.loading = false;
        state.colTasks.columns.forEach(col => {
          if (state.newTask != null && col.id === state.newTask.columnId) {
            col.tasks.push(state.newTask);
          }
        })
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = true;
        state.message = action.payload;
      });
  },
});

export default taskSlice.reducer;