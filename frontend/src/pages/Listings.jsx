import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListings } from '../features/listings/listingSlice'
import { Link } from 'react-router-dom'
import FullPageSpinner from '../components/FullPageSpinner'
import ListingListItem from '../components/ListingListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

function Listings() {
    let { listings } = useSelector((state) => state.listings)
    let [isLoading, setIsLoading] = useState(true)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListings())
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [dispatch])

    if (isLoading) return <FullPageSpinner />

    return (
        <div className='page listings'>
            <h1>Listings</h1>
            <div className='listingsDetailList wideList mt-5 mb-8'>
                {listings.length === 0 && (
                    <div className='flex p-5 justify-center items-center flex-col'>
                        <p>No listings added, yet</p>
                        <p className='addItem'>
                            <Link to='/newListing'>
                                <FontAwesomeIcon icon={faAdd} /> Add one
                            </Link>
                        </p>
                    </div>
                )}
                {listings.map((listing) => (
                    <ListingListItem key={listing._id} listing={listing} />
                ))}
            </div>
        </div>
    )
}

export default Listings
