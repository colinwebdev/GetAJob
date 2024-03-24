import axios from 'axios'

const API_URL = '/api/notes/'

async function createNote(noteData, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.post(API_URL, noteData, config)
    return response.data
}

async function getNotes(token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.get(API_URL, config)
    return response.data
}

// Delete note
async function deleteNote(noteId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.delete(API_URL + noteId, config)
    return response.data
}

async function getNote(noteId, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await axios.get(API_URL + noteId, config)
    return response.data
}

async function searchNotes(field, text, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.get(`${API_URL}/search/${field}/${text}`, config)
    return response.data
}

async function updateNote(noteId, noteData, token) {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let response = await axios.put(API_URL + noteId, noteData, config)
    return response.data
}

let noteService = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    searchNotes,
    deleteNote
}

export default noteService
