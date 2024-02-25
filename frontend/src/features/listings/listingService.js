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

// Get listings
async function getListing(listingId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(API_URL + listingId, config)
    return response.data
}

// Close listing
async function closeListing(listingId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.put(API_URL + listingId, {status: 'closed'}, config)
    return response.data
}

let listingService = {
    createListing,
    getListings,
    getListing,
    closeListing,
}
export default listingService
