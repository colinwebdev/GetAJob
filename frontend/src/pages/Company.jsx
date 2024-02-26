import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import FullPageSpinner from '../components/FullPageSpinner'
import { getCompany, updateCompany } from '../features/companies/companySlice'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingListItem from '../components/ListingListItem'
// import TextBlockFormat from '../components/TextBlockFormat'
import NotesBlock from '../components/NotesBlock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapBox from '../components/GoogleMapBox'
import {
    faPenToSquare,
    faIndustry,
    faLocationDot,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'

function Company() {
    let { company } = useSelector((state) => state.companies)
    let [isLoading, setIsLoading] = useState(true)
    let [saveLoading, setSaveLoading] = useState(false)

    let dispatch = useDispatch()
    let notesRef = useRef(null)

    let { companyId } = useParams()

    useEffect(() => {
        dispatch(getCompany(companyId))
        setTimeout(() => {
            setIsLoading(false)
            
        }, 500)
    }, [dispatch])

    async function submitNote(e) {
        e.preventDefault()
        if (notesRef.current.value === '') return
        setSaveLoading(true)
        let currDate = Date.now()
        let saveData = {
            ...company,
            notes: {
                ...company.notes,
                [currDate]: notesRef.current.value,
            },
        }
        dispatch(updateCompany({ companyId, companyData: saveData }))
            .unwrap()
            .then((response) => {
                
                 toast('Note added!', {
                        autoClose: 2000,
                    })
            })
        setSaveLoading(false)
    }

    if (isLoading) return <FullPageSpinner />

    return (
        <div className='page company'>
            <div className='header flex gap-5 items-center w-full'>
                {company.logoUrl && (
                    <img
                        src={company.logoUrl}
                        alt={`Logo for ${company.name}`}
                    />
                )}
                <h1>{company.name}</h1>
                <Link to={`/company/edit/${company._id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <div
                    className={
                        'badge ml-auto px-5 py-4 ' +
                        (company.isValid
                            ? 'badge-secondary badge-outline '
                            : 'badge-error')
                    }
                >
                    {company.isValid ? 'Valid' : 'NOT VALID'}
                </div>
            </div>

            <div className='details'>
                <div className={company.industry ? 'pale' : 'dimmed'}>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faIndustry} />
                    </div>

                    {company.industry ? company.industry : 'No industry listed'}
                </div>
                <div className={company.size ? 'pale' : 'dimmed'}>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faUsers} />
                    </div>

                    {company.size ? company.size : 'No size given'}
                </div>

                <div className={company.location ? 'pale' : 'dimmed'}>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    {company.location
                        ? `${company.location} `
                        : 'No location available'}
                    {company.commuteTime && `-- ${company.commuteTime} away`}
                </div>
            </div>
            <GoogleMapBox address={company.location} />
            <div className='notes'>
                <h2>Notes</h2>
                <NotesBlock data={company.notes}/>
                <form onSubmit={submitNote}>
                    <label htmlFor='notes'>
                        <h3>Add Note</h3>
                        <textarea
                            name='notes'
                            id='notes'
                            ref={notesRef}
                        ></textarea>
                    </label>
                    <div className='flex justify-end mb-8 w-full'>
                        <button type='submit' className='btn btn-secondary'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <h2 className='mt-7'>Listings from {company.name}</h2>
            <div className='listingsDetailList wideList mt-5 mb-8'>
                {company.listings.length === 0 && (
                    <p>This company has no listings, yet</p>
                )}
                {company.listings.map((listing) => (
                    <ListingListItem key={listing._id} listing={listing} />
                ))}
            </div>
        </div>
    )
}

export default Company
