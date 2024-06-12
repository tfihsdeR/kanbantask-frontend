import { ITask, Status } from "@/common.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const url = 'http://localhost:4000';

interface TaskState {
    task: ITask,
    tasks: ITask[],
    message: string | null,
    error: string | null,
    loading: boolean
}

export const initialState: TaskState = {
    task: {
        _id: '',
        title: '',
        status: Status.TODO,
        boardId: '',
        references: [],
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: '',
        createdBy: ''
    },
    tasks: [],
    message: null,
    error: null,
    loading: false
};

export const createTask = createAsyncThunk(
    'task/create',
    async (state: { task: ITask }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readTaskById = createAsyncThunk(
    'task/readById',
    async (state: { id: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/task/read/${state.id}`)

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readTasksByBoardId = createAsyncThunk(
    'task/readByBoardId',
    async (state: { boardId: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/task/readByBoardId/${state.boardId}`)

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateTask = createAsyncThunk(
    'task/update',
    async (state: { task: ITask }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/task/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTask = createAsyncThunk(
    'task/delete',
    async (state: { id: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/task/delete/${state.id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)