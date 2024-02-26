import PropTypes from 'prop-types'
import { searchListings } from '../features/listings/listingSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Spinner from './Spinner'

function CompanyListItem({ company }) {
    // let [isLoading, setIsLoading] = useState(true)

    let devID = '65d84dcb2de456bef846908a'

    let [itemCount, setItemCount] = useState('')

    let dispatch = useDispatch()

    return (
        <Link to={`/company/${company._id}`} className='listCard flex gap-5 companyList'>
            <div className='logo'>
                <img src={company.logo}></img>
            </div>
            <div className='name grow'>{company.name}</div>
            <div className='location'>{company.location}</div>
            <div className='industry'>{company.industry}</div>
            <div className="numJobs font-bold">{company.listings.length !== 0 && company.listings.length }</div>
        </Link>
    )
}

CompanyListItem.propTypes = {
    company: PropTypes.object.isRequired,
}

export default CompanyListItem
