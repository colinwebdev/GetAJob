import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
    notes: [],
    note: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
//  Create new note
export const createNote = createAsyncThunk(
    'notes/create',
    async (noteData, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await noteService.createNote(noteData, token)
        } catch (error) {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//  Get Notes
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async (_, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(token)
        } catch (error) {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


//  Delete Note
export const deleteNote = createAsyncThunk(
    'note/delete',
    async (noteId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await noteService.deleteNote(noteId, token)
        } catch (error) {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


//  Get Note
export const getNote = createAsyncThunk(
    'notes/get',
    async (noteId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await noteService.getNote(noteId, token)
        } catch (error) {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update note
export const updateNote = createAsyncThunk(
    'notes/update',
    async ({noteId, noteData}, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await noteService.updateNote(noteId, noteData, token)
        } catch (error) {
            let message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
                    
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
        clearNotes: (state) => ({
            ...state,
            notesList: []
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.note = action.payload
            })
            .addCase(getNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export let { reset } = noteSlice.actions
export default noteSlice.reducer
