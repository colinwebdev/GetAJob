import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { createListing } from '../features/listings/listingSlice'
import {
    payBasisTypes,
    jobTypes,
    remoteStatuses,
    seniorityTypes,
    educationLevels,
    sourceSites,
} from '../data/miscData'
import {
    createCompany,
    searchCompanies,
    clearCompanies
} from '../features/companies/companySlice'

function NewListing() {
    const { user } = useSelector((state) => state.auth)
    const { companies } = useSelector((state) => state.companies)

    let [showCompanies, setShowCompanies] = useState(false)
    let [showSources, setShowSources] = useState(false)
    let [showBasis, setShowBasis] = useState(false)
    let [showTypes, setShowTypes] = useState(false)
    let [showRemote, setShowRemote] = useState(false)
    let [showSen, setShowSen] = useState(false)
    let [showEdu, setShowEdu] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    let [isAddingCompany, setIsAddingCompany] = useState(false)
    let [nextPage, setNextPage] = useState(null)

    let [formData, setFormData] = useState({
        title: '',
        user: user._id,
        companyID: 0,
        datePosted: '',
        skills: [],
        seniority: '',
        pay: '',
        payBasis: '',
        type: '',
        scheduleDays: '',
        scheduleTime: '',
        remoteStatus: '',
        education: '',
        description: [],
        benefits: [],
        qualifications: [],
        duration: '',
        directLink: '',
        closingDate: '',
        notes: [],
        sources: '',
    })
    let {
        title,
        companyID,
        datePosted,
        skills,
        seniority,
        pay,
        payBasis,
        type,
        scheduleDays,
        scheduleTime,
        remoteStatus,
        education,
        description,
        benefits,
        qualifications,
        duration,
        directLink,
        closingDate,
        notes,
        sources,
    } = formData

    let smallSpinner = <Spinner scale={'small'} />

    let navigate = useNavigate()
    let dispatch = useDispatch()

    let companyRef = useRef(null)

    let companyContent = showCompanies && companies ? mapData(companies, 'company') : ''
    let sourceContent = showSources && sourceSites ? mapData(sourceSites, 'source') : ''
    let basisContent = showBasis && payBasisTypes ? mapData(payBasisTypes, 'basis') : ''
    let typesContent = showTypes && jobTypes ? mapData(jobTypes, 'type') : ''
    let remoteContent = showRemote && remoteStatuses ? mapData(remoteStatuses, 'remote') : ''
    let senContent = showSen && seniorityTypes ? mapData(seniorityTypes, 'sen') : ''
    let eduContent = showEdu && educationLevels ? mapData(educationLevels, 'edu') : ''

    function mapData(data, type) {
        return (
            <>
                {data.map((item, i) => (
                    <span
                        key={item._id ? item._id : i}
                        data-id={item._id ? item._id : i}
                        data-type={type}
                        onClick={addValues}
                    >
                        {item.name}
                    </span>
                ))}
            </>
        )
    }
    async function addValues(e) {
        let type = e.target.dataset.type
        // let dataId = e.target.dataset.id
        let text = e.target.innerText
        let field = ''
        switch (type) {
            case 'company':
                companyRef.current.value = e.target.innerText
                setFormData((prevState)=>({
                  ...prevState,
                  companyID: e.target.dataset.id
                }))
                break
            case 'source':
                break
            case 'basis':
                field = 'payBasis'
                break
            case 'type':
                field = 'type'
                break
            case 'remote':
                field = 'remoteStatus'
                break
            case 'sen':
                field = 'seniority'
                break
            case 'edu':
                field = 'education'
                break
            default:
                break
        }
        setFormData((prevState) => ({
            ...prevState,
            [field]: text,
        }))
    }

    async function handleFocus(e) {
        e.target.parentNode.parentNode.style.zIndex = 990
        switch (e.target.id) {
            case 'company':
                break
            case 'source':
                setShowSources(true)
                break
            case 'payBasis':
                setShowBasis(true)
                break
            case 'type':
                setShowTypes(true)
                break
            case 'remoteStatus':
                setShowRemote(true)
                break
            case 'seniority':
                setShowSen(true)
                break
            case 'education':
                setShowEdu(true)
                break
            default:
                break
        }
    }

    async function removeFocus(e) {
        setTimeout(() => {
            e.target.parentNode.parentNode.style.zIndex = ''
            switch (e.target.id) {
                case 'companyName':
                    dispatch(clearCompanies())
                    setShowCompanies(false)
                    break
                case 'source':
                    setShowSources(false)
                    break
                case 'payBasis':
                    setShowBasis(false)
                    break
                case 'type':
                    setShowTypes(false)
                    break
                case 'remoteStatus':
                    setShowRemote(false)
                    break
                case 'seniority':
                    setShowSen(false)
                    break
                case 'education':
                    setShowEdu(false)
                    break
                default:
                    break
            }
        }, 100)
    }

    async function handleChange(e) {
        let text = e.target.value
        if (e.target.id === 'companyName') {
            setShowCompanies(true)
            dispatch(searchCompanies(text))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
        }
    }

    async function submitListing() {
        dispatch(createListing(formData))
            .unwrap()
            .then((response) => {
                !nextPage ? navigate(`/listing/${response._id}`) : navigate(nextPage)
                toast('Listing created!', {
                    autoClose: 2000,
                })
            })
            .catch(toast.error)
    }

    async function addCompany() {
        setIsAddingCompany(true)
        dispatch(
            createCompany({
                name: companyRef.current.value,
            })
        )
            .then((response) => {
                setNextPage(`/company/edit/${response.payload._id}`)
                setFormData((prevState) => ({
                    ...prevState,
                    companyID: response.payload._id,
                }))
                setIsAddingCompany(false)
            })
            .then(submitListing())
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        if (companyID === 0) {
            addCompany()
        }
        if (!isAddingCompany) {
            submitListing()
        }
        setIsLoading(false)
    }

    if (isLoading)
        return (
            <div className='page'>
                <div className='spinnerWrap'>
                    <div className='spinnerInner'>
                        <Spinner />
                    </div>
                </div>
            </div>
        )

    return (
        <div className='page newListingPage'>
            <h1 className='text-primary pl-8'>New Listing</h1>
            <form
                className='flex gap-8 mb-8 mt-5 flex-wrap'
                onSubmit={handleSubmit}
            >
                <div className='col grow'>
                    <label htmlFor='title'>
                        <p>Title</p>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={title}
                            autoComplete='off'
                            onChange={handleChange}
                        />
                    </label>
                    <div className='formLine'>
                        <div className='autoComplete grow'>
                            <label htmlFor='company'>
                                <p>Company</p>
                                <input
                                    type='text'
                                    id='companyName'
                                    name='companyName'
                                    ref={companyRef}
                                    onBlur={removeFocus}
                                    onFocus={handleFocus}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                            </label>
                            <div className='box'>{companyContent}</div>
                        </div>
                        <label htmlFor='datePosted' className='narrow'>
                            <p>Date Posted</p>
                            <input
                                type='date'
                                id='datePosted'
                                name='datePosted'
                                onChange={handleChange}
                                autoComplete='off'
                                value={datePosted}
                            />
                        </label>
                    </div>

                    {/* End form line */}
                    <div className='formLine'>
                        <label htmlFor='pay' className='narrow'>
                            <p>Pay</p>
                            <input
                                type='number'
                                id='pay'
                                name='pay'
                                onChange={handleChange}
                                autoComplete='off'
                                value={pay}
                            />
                        </label>
                        <div className='autoComplete grow'>
                            <label htmlFor='payBasis' className='narrow'>
                                <p>Pay Basis</p>
                                <input
                                    type='text'
                                    id='payBasis'
                                    name='payBasis'
                                    onFocus={handleFocus}
                                    onBlur={removeFocus}
                                    onChange={handleChange}
                                    // autoComplete='off'
                                    value={payBasis}
                                />
                            </label>
                            <div className='box'>{basisContent}</div>
                        </div>
                        <div className='autoComplete grow'>
                            <label htmlFor='source'>
                                <p>Source</p>
                                <input
                                    type='text'
                                    id='source'
                                    name='source'
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={removeFocus}
                                    autoComplete='off'
                                    value={sources}
                                />
                            </label>
                            <div className='box'>{sourceContent}</div>
                        </div>
                    </div>
                    {/* End form line */}
                    <div className='formLine'>
                        <div className='autoComplete grow'>
                            <label htmlFor='type'>
                                <p>Type</p>
                                <input
                                    type='text'
                                    id='type'
                                    name='type'
                                    onFocus={handleFocus}
                                    onBlur={removeFocus}
                                    onChange={handleChange}
                                    autoComplete='off'
                                    value={type}
                                />
                            </label>
                            <div className='box'>{typesContent}</div>
                        </div>
                        <div className='autoComplete grow'>
                            <label htmlFor='remoteStatus'>
                                <p>Remote Status</p>
                                <input
                                    type='text'
                                    id='remoteStatus'
                                    name='remoteStatus'
                                    onFocus={handleFocus}
                                    onBlur={removeFocus}
                                    onChange={handleChange}
                                    autoComplete='off'
                                    value={remoteStatus}
                                />
                            </label>
                            <div className='box'>{remoteContent}</div>
                        </div>
                        <label htmlFor='closingDate'>
                            <p>Remote Status</p>
                            <input
                                type='date'
                                id='closingDate'
                                name='closingDate'
                                onFocus={handleFocus}
                                onBlur={removeFocus}
                                onChange={handleChange}
                                autoComplete='off'
                                value={closingDate}
                            />
                        </label>
                    </div>
                    {/* end form line */}
                    <div className='formLine'>
                        <label htmlFor='scheduleDays'>
                            <p>Schedule Days</p>
                            <input
                                type='text'
                                id='scheduleDays'
                                name='scheduleDays'
                                onChange={handleChange}
                                autoComplete='off'
                                value={scheduleDays}
                            />
                        </label>
                        <label htmlFor='scheduleTime'>
                            <p>Schedule Time</p>
                            <input
                                type='text'
                                id='scheduleTime'
                                name='scheduleTime'
                                onChange={handleChange}
                                autoComplete='off'
                                value={scheduleTime}
                            />
                        </label>
                        <label htmlFor='duration'>
                            <p>Duration</p>
                            <input
                                type='text'
                                id='duration'
                                name='duration'
                                onChange={handleChange}
                                autoComplete='off'
                                value={duration}
                            />
                        </label>
                    </div>
                    {/* end form line */}
                    <div className='formLine'>
                        <div className='autoComplete grow'>
                            <label htmlFor='seniority'>
                                <p>Seniority</p>
                                <input
                                    type='text'
                                    id='seniority'
                                    name='seniority'
                                    onFocus={handleFocus}
                                    onBlur={removeFocus}
                                    onChange={handleChange}
                                    autoComplete='off'
                                    value={seniority}
                                />
                            </label>
                            <div className='box'>{senContent}</div>
                        </div>
                        <div className='autoComplete grow'>
                            <label htmlFor='education'>
                                <p>Education</p>
                                <input
                                    type='text'
                                    id='education'
                                    name='education'
                                    onFocus={handleFocus}
                                    onBlur={removeFocus}
                                    onChange={handleChange}
                                    autoComplete='off'
                                    value={education}
                                />
                            </label>
                            <div className='box'>{eduContent}</div>
                        </div>
                        <label htmlFor='skills' className='grow flex flex-col'>
                            <p>Skills</p>
                            <textarea
                                className='grow'
                                id='skills'
                                name='skills'
                                onChange={handleChange}
                                autoComplete='off'
                                value={skills}
                            ></textarea>
                        </label>
                    </div>
                    {/* end form line */}
                    <label htmlFor='directLink'>
                        <p>Direct Link</p>
                        <input
                            type='text'
                            id='directLink'
                            name='directLink'
                            onChange={handleChange}
                            autoComplete='off'
                            value={directLink}
                        />
                    </label>
                    <label htmlFor='sourceLink'>
                        <p>Source Link</p>
                        <input
                            type='text'
                            id='sourceLink'
                            name='sourceLink'
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </label>
                </div>
                {/* end col */}
                <div className='col w-1/2 flex flex-col'>
                    <label htmlFor='desc' className='grow flex flex-col'>
                        <p>Description</p>
                        <textarea
                            className='grow'
                            id='desc'
                            name='desc'
                            onChange={handleChange}
                            autoComplete='off'
                            value={description}
                        ></textarea>
                    </label>
                    <label htmlFor='qual' className='grow flex flex-col'>
                        <p>Qualifications</p>
                        <textarea
                            className='grow'
                            id='qual'
                            name='qual'
                            onChange={handleChange}
                            autoComplete='off'
                            value={qualifications}
                        ></textarea>
                    </label>
                    <label htmlFor='bene' className='grow flex flex-col'>
                        <p>Benefits</p>
                        <textarea
                            className='grow'
                            id='bene'
                            name='bene'
                            onChange={handleChange}
                            autoComplete='off'
                            value={benefits}
                        ></textarea>
                    </label>
                </div>
                <div className='flex justify-end mb-8 w-full'>
                    <button type='submit' className='btn btn-secondary'>
                        Save
                    </button>
                </div>
                {/* end col */}
            </form>
        </div>
    )
}

export default NewListing
