import axios from 'axios'

const API_URL = '/api/skills/'

async function createSkill(skillData) {
    
    let response = await axios.post(API_URL, skillData)
    return response.data
}

async function getSkills() {
    
    let response = await axios.get(API_URL)
    return response.data
}

async function getSkill(skillId) {
    
    let response = await axios.get(API_URL + skillId)

    return response.data
}

async function searchSkills(field, text) {
    
    let response = await axios.get(`${API_URL}/search/${field}/${text}`)
    return response.data
}

async function updateSkill(skillId, skillData) {
    
    let response = await axios.put(API_URL + skillId, skillData)
    return response.data
}

// Delete skill
async function deleteSkill(skillId) {
    
    let response = await axios.delete(API_URL + skillId)
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
