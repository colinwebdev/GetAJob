import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
