import axios from 'axios'

const API_URL = '/api/companies/'

// Create new company
async function createCompany(companyData, token) {
    console.log(companyData)
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.post(API_URL, companyData, config)
    return response.data
}

// Get companies
async function getCompanies(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(API_URL, config)
    return response.data
}


// Search companies
async function searchCompanies(field, text, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(`${API_URL}/search/${field}/${text}` , config)
    
    return response.data
}


// Get company
async function getCompany(companyId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    let response = await axios.get(API_URL + companyId, config)

    return response.data
}

// Delete company
async function deleteCompany(companyId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    let response = await axios.delete(API_URL + companyId, config)

    return response.data
}

// Update company
async function updateCompany(companyId, companyData, token) {
    
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.put(API_URL + companyId, companyData, config)
    
    return response.data
}

// Close company
async function closeCompany(companyId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.put(
        API_URL + companyId,
        { status: 'closed' },
        config
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
