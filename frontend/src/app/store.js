import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import listingsReducer from '../features/listings/listingSlice'
import companiesReducer from '../features/companies/companySlice'
import skillsReducer from '../features/skills/skillsSlice'
import notesReducer from '../features/notes/noteSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        listings: listingsReducer,
        companies: companiesReducer,
        skills: skillsReducer,
        notes: notesReducer,
    },
})
