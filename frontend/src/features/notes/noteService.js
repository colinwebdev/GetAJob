import axios from 'axios'

const API_URL = '/api/notes/'

async function createNote(noteData) {
    
    let response = await axios.post(API_URL, noteData)
    return response.data
}

async function getNotes() {
    
    let response = await axios.get(API_URL)
    return response.data
}

// Delete note
async function deleteNote(noteId) {
    

    let response = await axios.delete(API_URL + noteId)
    return response.data
}

async function getNote(noteId) {
    

    let response = await axios.get(API_URL + noteId)
    return response.data
}

async function searchNotes(field, text) {
    let response = await axios.get(`${API_URL}/search/${field}/${text}`)
    return response.data
}

async function updateNote(noteId, noteData) {
    
    let response = await axios.put(API_URL + noteId, noteData)
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
