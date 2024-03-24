import axios from 'axios'

const API_URL = '/api/skills/'

async function createSkill(skillData, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.post(API_URL, skillData, config)
    return response.data
}

async function getSkills(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.get(API_URL, config)
    return response.data
}

async function getSkill(skillId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(API_URL + skillId, config)

    return response.data
}

async function searchSkills(field, text, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.get(`${API_URL}/search/${field}/${text}`, config)
    return response.data
}

async function updateSkill(skillId, skillData, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.put(API_URL + skillId, skillData, config)
    return response.data
}

// Delete skill
async function deleteSkill(skillId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.delete(API_URL + skillId, config)
    return response.data
}

let skillService = {
    createSkill,
    getSkills,
    getSkill,
    updateSkill,
    searchSkills,
    deleteSkill
}

export default skillService
