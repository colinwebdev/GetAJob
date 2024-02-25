import axios from 'axios'

const API_URL = '/api/users'

// Register user
let register = async (userData) => {
    let response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

let login = async (userData) => {
    let response = await axios.post(API_URL + '/login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout

function logout() {
    localStorage.removeItem('user')
}

let authService = {
    register,
    logout,
    login,
}

export default authService
