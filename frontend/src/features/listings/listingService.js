import axios from 'axios'

const API_URL = '/api/listings/'

// Create new listing
async function createListing(listingData, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.post(API_URL, listingData, config)

    return response.data
}

async function getDashboard(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    let response = await axios.get(API_URL + 'dash', config)

    return response.data
}

// Get listings
async function getListings(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(API_URL, config)
    return response.data
}

// Filter listings
async function filterListings(filterType, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    let response = await axios.get(API_URL + 'filter/' + filterType, config)
    return response.data
}

// Get listings
async function skillListings(skillId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    let response = await axios.get(API_URL + 'withSkill/' + skillId, config)
    return response.data
}

// Create update listing
async function updateListing(listingId, listingData, token) {
    
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.put(API_URL + listingId, listingData, config)

    return response.data
}

// Get listing
async function getListing(listingId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(API_URL + listingId, config)
    return response.data
}

// Delete listing
async function deleteListing(listingId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.delete(API_URL + listingId, config)
    return response.data
}

// Search listings
async function searchListings(field, text, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    
    let response = await axios.get(`${API_URL}/search/${field}/${text}`, config).then()
    return response.data
}

// Close listing
async function closeListing(listingId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.put(
        API_URL + listingId,
        { status: 'closed' },
        config
    )
    return response.data
}

let listingService = {
    createListing,
    getListings,
    getListing,
    deleteListing,
    searchListings,
    updateListing,
    getDashboard,
    filterListings,
    skillListings
}
export default listingService
