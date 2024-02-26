import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listingService from './listingService'

const initialState = {
    listings: [],
    listingsCount: 0,
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

//  Update listing
export const updateListing = createAsyncThunk(
    'listings/update',
    async ({listingData, listingId}, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token
            return await listingService.updateListing(listingData, token)
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

//  Search Listings
export const searchListings = createAsyncThunk(
    'listings/search',
    async ({field, text}, thunkAPI) => {
        try {
            if (text) {
                let token = thunkAPI.getState().auth.user.token
                return await listingService.searchListings(field, text, token)
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
    'listings/close',
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
                state.listings = action.payload
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
                state.listing = action.payload
            })
            .addCase(getListing.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(searchListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchListings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listings = action.payload
                state.listingsCount = action.payload.length
            })
            .addCase(searchListings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
           
    },
})

export let { reset } = listingSlice.actions
export default listingSlice.reducer
