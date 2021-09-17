import axios from 'axios'

export async function getAllCandidates() {
  return await axios.get('/candidates')
}

export async function addCandidate(data) {
  return await axios.post('/candidates', data)
}

export async function getCandidateById(candidateId) {
  return await axios.get(`/candidates/${candidateId}`)
}

export async function updateCandidate(candidatesId, data) {
  return await axios.put(`/candidates/${candidatesId}`, data)
}

export async function deleteCandidate(candidatesId) {
  return await axios.delete(`/candidates/${candidatesId}`)
}

export async function getInterviewsOfCandidate(candidateId) {
  return await axios.get(`/candidates/${candidateId}/interviews`)
}