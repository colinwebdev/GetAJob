import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { getCompany } from '../features/companies/companySlice'
import Spinner from './Spinner'
import { useSelector, useDispatch } from 'react-redux'

function ListingListItem({ listing }) {
       return (
        <div className='listCard flex gap-5 listingList'>
            <div className='name grow'>{listing.title}</div>
            <div className='companyName'>{listing.companyID ? listing.companyID.name : 'Company not found'}</div>
            <div className='type'>{listing.type}</div>
            <div className='pay'>
                ${listing.pay}/{listing.payBasis}
            </div>
            <div className='isRemote'></div>
            <div className='posted'>{listing.datePosted}</div>
        </div>
    )
}

ListingListItem.propTypes = {
    listing: PropTypes.object.isRequired,
}

export default ListingListItem
