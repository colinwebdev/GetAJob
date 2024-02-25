import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listingService from './listingService'

const initialState = {
    listings: [],
    listing: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//  Create new listing
export const createListing = createAsyncThunk(
    'listings/create',
    async (listingData, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await listingService.createListing(listingData, token)
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

//  Get Listings
export const getListings = createAsyncThunk(
    'listings/getAll',
    async (_, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await listingService.getListings(token)
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

//  Get Listing
export const getListing = createAsyncThunk(
    'listings/get',
    async (listingId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await listingService.getListing(listingId, token)
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

// Close Listing
export const closeListing = createAsyncThunk(
    'tickets/close',
    async (listingId, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await listingService.closeListing(listingId, token)
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

export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createListing.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getListings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getListing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListing.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
           
    },
})

export let { reset } = listingSlice.actions
export default listingSlice.reducer
