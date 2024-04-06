import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import globalService from '../features/global/globalService'

function ListingListItem({ listing }) {
    return (
        <tr>
            <td>
                <Link className='name' to={`/listing/${listing._id}`}>
                    {listing.title}
                </Link>
            </td>
            <td className='companyName'>
                {listing.companyID
                    ? listing.companyID.name
                    : 'Company not found'}
            </td>
            <td className='type'>{listing.type}</td>
            <td className='pay'>
                {listing.pay > 0 && '$'}
                {listing.pay && Number(listing.pay).toLocaleString()}
                {listing.payBasis && <>/{listing.payBasis}</>}
            </td>
            <td className='isRemote'></td>
            <td className='posted'>{globalService.formatDate(listing.datePosted, false)}</td>
        </tr>
        // <Link
        //     className='listCard flex gap-5 listingList'
        //     to={`/listing/${listing._id}`}
        // >
        //     <div className='name grow'>{listing.title}</div>
        //     <div className='companyName'>
        //         {listing.companyID
        //             ? listing.companyID.name
        //             : 'Company not found'}
        //     </div>
        //     <div className='type'>{listing.type}</div>
        //     <div className='pay'>
        //         {listing.pay > 0 && '$'}{listing.pay}{listing.payBasis && (<>/{listing.payBasis}</>)}
        //     </div>
        //     <div className='isRemote'></div>
        //     <div className='posted'>{globalService.formatDate(listing.datePosted, false)}</div>
        // </Link>
    )
}

ListingListItem.propTypes = {
    listing: PropTypes.object.isRequired,
}

export default ListingListItem
