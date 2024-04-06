import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listingService from './listingService'

const initialState = {
    listings: [],
    listingsCount: 0,
    listing: {},
    dashboard: {},
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
            let data = await listingService.createListing(listingData)
            return data
        } catch (error) {
            console.log(error)
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

export const getDashboard = createAsyncThunk(
    'listings/dash',
    async (_, thunkAPI) => {
        
        try {
            
            return await listingService.getDashboard()
        } catch (error) {
            console.log(error)
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
    async ({ listingId, listingData }, thunkAPI) => {
        try {
            return await listingService.updateListing(
                listingId,
                listingData
                
            )
        } catch (error) {
            console.log(error)
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
            
            return await listingService.getListings()
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

//  Filter Listings
export const filterListings = createAsyncThunk(
    'listings/filter',
    async (filterType, thunkAPI) => {
        try {
            
            
            return await listingService.filterListings(filterType)
        } catch (error) {
            console.log(error)
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

export const skillListings = createAsyncThunk(
    'listings/skills',
    async (skillId, thunkAPI) => {
        try {
            
            
            return await listingService.skillListings(skillId)
        } catch (error) {
            console.log(error)
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
    async ({ field, text }, thunkAPI) => {
        try {
            if (text) {
                
                return await listingService.searchListings(field, text)
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
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
            
            return await listingService.getListing(listingId)
        } catch (error) {
            console.log(error)
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

//  Delete Listing
export const deleteListing = createAsyncThunk(
    'listings/delete',
    async (listingId, thunkAPI) => {
        try {
            
            return await listingService.deleteListing(listingId)
        } catch (error) {
            console.log(error)
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
            .addCase(getDashboard.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDashboard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDashboard.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dashboard = action.payload
            })
            .addCase(filterListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filterListings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listings = action.payload
            })
            .addCase(filterListings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(skillListings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(skillListings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listings = action.payload
            })
            .addCase(skillListings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export let { reset } = listingSlice.actions
export default listingSlice.reducer
