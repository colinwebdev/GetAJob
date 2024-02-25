import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCompanies } from '../features/companies/companySlice'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Companies() {
    let { companies } = useSelector((state) => state.companies)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCompanies())
    }, [dispatch])

    return <div className='page'>
      {companies.map((company, i)=>(
        <div> 
          <Link to={`/company/edit/${company._id}`} >
            {company.name}
          </Link>
        </div>
      ))}
    
    </div>
}

export default Companies
