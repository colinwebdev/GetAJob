import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Panel from './components/Panel'
import NewListing from './pages/NewListing'
import Listings from './pages/Listings'
import Companies from './pages/Companies'
import Skills from './pages/Skills'
import Register from './pages/Register'
import Login from './pages/Login'
import NewCompany from './pages/NewCompany'
import PrivateRoute from './components/PrivateRoute'
import Company from './pages/Company'
import Listing from './pages/Listing'
import NotFound from './pages/NotFound'
import Notes from './pages/Notes'


function App() {
    return (
        <>
            <Router>
                <Panel />
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route path='/listings' element={<PrivateRoute />}>
                        <Route path='/listings' element={<Listings />} />
                    </Route>
                    <Route path='/listings/filter/:type' element={<PrivateRoute />}>
                        <Route path='/listings/filter/:type' element={<Listings />} />
                    </Route>
                    <Route path='/listing/:listingId' element={<PrivateRoute />}>
                        <Route path='/listing/:listingId' element={<Listing />} />
                    </Route>
                    <Route path='/listing/edit/:listingId' element={<PrivateRoute />}>
                        <Route path='/listing/edit/:listingId' element={<NewListing />} />
                    </Route>
                    <Route path='/newListing' element={<PrivateRoute />}>
                        <Route path='/newListing' element={<NewListing />} />
                    </Route>
                    <Route path='/companies' element={<PrivateRoute />}>
                        <Route path='/companies' element={<Companies />} />
                    </Route>
                    <Route path='/company/:companyId' element={<Company />}>
                        <Route path='/company/:companyId' element={<Company />} />
                    </Route>
                    <Route path='/company/edit/:companyId' element={<PrivateRoute />}>
                        <Route path='/company/edit/:companyId' element={<NewCompany />} />
                    </Route>
                    <Route path='/newCompany' element={<PrivateRoute />}>
                        <Route path='/newCompany' element={<NewCompany />} />
                    </Route>
                    <Route path='/skills' element={<PrivateRoute />}>
                        <Route path='/skills' element={<Skills />} />
                    </Route>
                    <Route path='/notes' element={<PrivateRoute />}>
                        <Route path='/notes' element={<Notes />} />
                    </Route>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/notFound' element={<NotFound />} />
                </Routes>
            </Router>
            <ToastContainer
                position='top-right'
                autoClose={false}
                hideProgressBar={true}
                transition={Slide}
                draggable
                draggablePercent={60}
            />
        </>
    )
}

export default App
