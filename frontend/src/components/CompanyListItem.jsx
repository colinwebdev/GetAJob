import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CompanyListItem({ company }) {
    function formatAddress(text) {
        if (!text) return
        let breakText = text.split('\n')
        
        return breakText.map((item, i)=>{
            return <p key={i}>{item}</p>
        })
        
    }

    return (
        <tr>
            <td className='logo'>
                {company.logoUrl && (
                    <Link to={`/company/${company._id}`}>
                        <img src={company.logoUrl}></img>
                    </Link>
                )}
            </td>
            <td>
                <Link to={`/company/${company._id}`} className='name'>
                    {company.name}
                </Link>
            </td>
            <td className='location'>{formatAddress(company.location)}</td>
            <td className='industry'>{company.industry}</td>
            <td className='numJobs font-bold'>
                {company.listings.length !== 0 && company.listings.length}
            </td>
        </tr>
    )
}

CompanyListItem.propTypes = {
    company: PropTypes.object.isRequired,
}

export default CompanyListItem
