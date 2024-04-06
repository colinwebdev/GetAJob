import axios from 'axios'

const API_URL = '/api/companies/'

// Create new company
async function createCompany(companyData) {
    
    let response = await axios.post(API_URL, companyData)
    return response.data
}

// Get companies
async function getCompanies() {
    
    let response = await axios.get(API_URL)
    return response.data
}


// Search companies
async function searchCompanies(field, text) {
    

    let response = await axios.get(`${API_URL}/search/${field}/${text}` )
    
    return response.data
}


// Get company
async function getCompany(companyId) {
    
    let response = await axios.get(API_URL + companyId)

    return response.data
}

// Delete company
async function deleteCompany(companyId) {
    
    let response = await axios.delete(API_URL + companyId)

    return response.data
}

// Update company
async function updateCompany(companyId, companyData) {
    
    let response = await axios.put(API_URL + companyId, companyData)
    
    return response.data
}

// Close company
async function closeCompany(companyId) {
    

    let response = await axios.put(
        API_URL + companyId,
        { status: 'closed' },
        
    )
    return response.data
}

let companyService = {
    createCompany,
    getCompanies,
    getCompany,
    closeCompany,
    updateCompany,
    searchCompanies,
    deleteCompany
}
export default companyService
