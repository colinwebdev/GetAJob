import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import listingsReducer from '../features/listings/listingSlice'
import companiesReducer from '../features/companies/companySlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    companies: companiesReducer
  },
});
