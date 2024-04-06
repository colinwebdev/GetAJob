import axios from 'axios'

const API_URL = '/api/listings/'

// Create new listing
async function createListing(listingData) {
    // let config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // }
    
    let response = await axios.post(API_URL, listingData)
    console.log(response)
    return response.data
}

async function getDashboard() {
    // console.log(token)
    // console.log('looking for:', API_URL + 'dash')
    // let config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     }
    // }
    let response = await axios.get(API_URL + 'dash')

    return response.data
}

// Get listings
async function getListings() {
    // let config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // }

    let response = await axios.get(API_URL)
    return response.data
}

// Filter listings
async function filterListings(filterType) {

    
    let response = await axios.get(API_URL + 'filter/' + filterType)
    return response.data
}

// Get listings
async function skillListings(skillId) {
    // let config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // }
    
    let response = await axios.get(API_URL + 'withSkill/' + skillId)
    return response.data
}

// Create update listing
async function updateListing(listingId, listingData) {
    


    let response = await axios.put(API_URL + listingId, listingData)

    return response.data
}

// Get listing
async function getListing(listingId) {


    let response = await axios.get(API_URL + listingId)
    return response.data
}

// Delete listing
async function deleteListing(listingId) {


    let response = await axios.delete(API_URL + listingId)
    return response.data
}

// Search listings
async function searchListings(field, text) {

    
    let response = await axios.get(`${API_URL}/search/${field}/${text}`).then()
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
