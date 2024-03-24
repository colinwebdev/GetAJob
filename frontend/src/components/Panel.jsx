// import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGaugeHigh,
    faFileContract,
    faBuilding,
    faNoteSticky,
    faSignInAlt,
    faSignOutAlt,
    faSquarePlus,
    faList,
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
        <nav className='sidePanel '>
            <h1>GET-A-JOB</h1>

            <div className='links'>
                <Link to='/' className='dashboard linkWrap'>
                    <FontAwesomeIcon icon={faGaugeHigh} size='2x' />
                    <span>Dashboard</span>
                </Link>
                <div className='linkGroup'>
                    <Link to='/listings' className='listings linkWrap'>
                        <FontAwesomeIcon icon={faFileContract} size='2x' />
                        <span>Listings</span>
                    </Link>
                    <Link to='/newListing' className='newListing subLinkWrap'>
                        <span>New Listing</span>
                        <FontAwesomeIcon icon={faSquarePlus} size='2x' />
                    </Link>
                </div>
                <div className='linkGroup'>
                    <Link to='/companies' className='companies linkWrap'>
                        <FontAwesomeIcon icon={faBuilding} size='2x' />
                        <span>Companies</span>
                    </Link>
                    <Link to='/newCompany' className='newCompany subLinkWrap'>
                        <span>New Company</span>
                        <FontAwesomeIcon icon={faSquarePlus} size='2x' />
                    </Link>
                </div>
                <Link to='/skills' className='skills linkWrap'>
                    <FontAwesomeIcon icon={faList} size='2x' />
                    <span>Skills</span>
                </Link>
                <Link to='/notes' className='notes linkWrap'>
                    <FontAwesomeIcon icon={faNoteSticky} size='2x' />
                    <span>Notes</span>
                </Link>
                {user ? (
                    <button className='logout linkWrap' onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size='2x' />
                        <span>Logout</span>
                    </button>
                ) : (
                    <Link to='/login' className='login linkWrap'>
                        <FontAwesomeIcon icon={faSignInAlt} size='2x' />
                        <span>Login</span>
                    </Link>
                )}
            </div>
            <div className='sideBottom'>&copy; {currYear} | Colin M</div>
        </nav>
    )
}

export default Panel
