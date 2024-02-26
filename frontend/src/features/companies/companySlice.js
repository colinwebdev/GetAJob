import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import companyService from './companyService'

const initialState = {
    companies: [],
    company: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//  Create new company
export const createCompany = createAsyncThunk(
    'companies/create',
    async (companyData, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await companyService.createCompany(companyData, token)
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

//  Get Companies
export const getCompanies = createAsyncThunk(
    'companies/getAll',
    async (_, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await companyService.getCompanies(token)
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

//  search Companies
export const searchCompanies = createAsyncThunk(
    'companies/search',
    async ({field, text}, thunkAPI) => {
        try {
            if (text) {
                let token = thunkAPI.getState().auth.user.token
                return await companyService.searchCompanies(field, text, token)
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


//  Get Company
export const getCompany = createAsyncThunk(
    'companies/get',
    async (companyId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await companyService.getCompany(companyId, token)
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

// Update company
export const updateCompany = createAsyncThunk(
    'companies/update',
    async ({companyId, companyData}, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await companyService.updateCompany(companyId, companyData, token)
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

// Delete Company
// export const closeCompany = createAsyncThunk(
//     'tickets/close',
//     async (companyId, thunkAPI) => {
//         try {
//             let token = thunkAPI.getState().auth.user.token
//             return await companyService.closeTicket(companyId, token)
//         } catch (error) {
//             let message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        reset: (state) => initialState,
        clearCompanies: (state) => ({
            ...state,
            companies: []
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCompany.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCompany.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCompanies.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.companies = action.payload
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCompany.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.company = action.payload
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(searchCompanies.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchCompanies.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.companies = action.payload
            })
            .addCase(searchCompanies.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export let { reset, clearCompanies } = companySlice.actions
export default companySlice.reducer
