// import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGaugeHigh,
    faFileContract,
    faBuilding,
    faListCheck,
    faNoteSticky,
    faSignInAlt,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

function Panel() {
    let currYear = new Date().getFullYear()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { user } = useSelector((state) => state.auth)

    function onLogout() {
        dispatch(logout())
        dispatch(reset())

        navigate('/')
    }

    return (
        <nav className='sidePanel text-base-100 h-screen fixed bg-gradient-to-b from-secondary to-primary'>
            <h1 className='border-b-8 border-base-100'>GET-A-JOB</h1>

            <div className='links'>
                <Link to='/' className='dashboard linkWrap'>
                    <FontAwesomeIcon icon={faGaugeHigh} size='2x' />
                    Dashboard
                </Link>
                <div className='linkGroup'>
                    <Link to='/listings' className='listings linkWrap'>
                        <FontAwesomeIcon icon={faFileContract} size='2x' />
                        Listings
                    </Link>
                    <Link
                        to='/newListing'
                        className='newListing border-base-100 border-t-2 subLinkWrap before:border-base-100 before:border-b-2 before:border-l-2'
                    >
                        New Listing
                    </Link>
                </div>
                <div className='linkGroup'>
                    <Link to='/companies' className='companies linkWrap'>
                        <FontAwesomeIcon icon={faBuilding} size='2x' />
                        Companies
                    </Link>
                    <Link
                        to='/newCompany'
                        className='newCompany border-base-100 border-t-2 subLinkWrap before:border-base-100 before:border-b-2 before:border-l-2'
                    >
                        New Company
                    </Link>
                </div>
                <Link to='/skills' className='skills linkWrap'>
                    <FontAwesomeIcon icon={faListCheck} size='2x' />
                    Skills
                </Link>
                <Link to='/' className='notes linkWrap'>
                    <FontAwesomeIcon icon={faNoteSticky} size='2x' />
                    Notes
                </Link>
                {user ? (
                    <button className='logout linkWrap' onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size='2x' />
                        Logout
                    </button>
                ) : (
                    <Link to='/login' className='login linkWrap'>
                        <FontAwesomeIcon icon={faSignInAlt} size='2x' />
                        Login
                    </Link>
                )}
            </div>
            <div className='sideBottom'>&copy; {currYear} | Orion</div>
        </nav>
    )
}

export default Panel
