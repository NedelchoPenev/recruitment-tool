import axios from 'axios'

export async function getAllJobs() {
  return await axios.get('/jobs')
}

export async function postJob(data) {
  return await axios.post('/jobs', data)
}

export async function getJobById(jobId) {
  return await axios.get(`/jobs/${jobId}`)
}

export async function updateJob(jobId, data) {
  return await axios.put(`/jobs/${jobId}`, data)
}

export async function deleteJob(jobId) {
  return await axios.delete(`/jobs/${jobId}`)
}

export async function getAllInterviewsForJob(jobId) {
  return await axios.get(`/jobs/${jobId}/interviews`)
}

export async function getAllCandidatesForJob(jobId) {
  return await axios.get(`/jobs/${jobId}/candidates`)
}

export async function addCandidateToJob(jobId, data) {
  return await axios.post(`/jobs/${jobId}/candidates`, data)
}

export async function deleteCandidateFromJob(jobId, candidateId) {
  return await axios.delete(`/jobs/${jobId}/candidates/${candidateId}`)
}