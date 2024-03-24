import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import skillService from './skillsService'

const initialState = {
    skillsList: [],
    skill: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
//  Create new skill
export const createSkill = createAsyncThunk(
    'skills/create',
    async (skillData, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await skillService.createSkill(skillData, token)
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

//  Get Skills
export const getSkills = createAsyncThunk(
    'skills/getAll',
    async (_, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await skillService.getSkills(token)
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

//  Delete Skill
export const deleteSkill = createAsyncThunk(
    'skills/delete',
    async (skillId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await skillService.deleteSkill(skillId, token)
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

//  search Skills
export const searchSkills = createAsyncThunk(
    'skills/search',
    async ({field, text}, thunkAPI) => {
        try {
            if (text) {
                let token = thunkAPI.getState().auth.user.token
                return await skillService.searchSkills(field, text, token)
            } else {
                return null
            }
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


//  Get Skill
export const getSkill = createAsyncThunk(
    'skills/get',
    async (skillId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await skillService.getSkill(skillId, token)
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

// Update skill
export const updateSkill = createAsyncThunk(
    'skills/update',
    async ({skillId, skillData}, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await skillService.updateSkill(skillId, skillData, token)
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


export const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        reset: (state) => initialState,
        clearSkills: (state) => ({
            ...state,
            skillsList: []
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSkill.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSkill.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createSkill.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSkills.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSkills.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skillsList = action.payload
            })
            .addCase(getSkills.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSkill.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSkill.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skill = action.payload
            })
            .addCase(getSkill.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(searchSkills.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchSkills.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skillsList = action.payload
            })
            .addCase(searchSkills.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export let { reset } = skillSlice.actions
export default skillSlice.reducer
