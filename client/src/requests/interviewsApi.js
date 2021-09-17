import axios from 'axios'

export async function getAllInterviews() {
  return await axios.get('/interviews')
}

export async function addInterview(data) {
  return await axios.post('/interviews', data)
}

export async function getInterviewById(interviewId) {
  return await axios.get(`/interviews/${interviewId}`)
}

export async function updateInterview(interviewsId, data) {
  return await axios.put(`/interviews/${interviewsId}`, data)
}

export async function deleteInterview(interviewsId) {
  return await axios.delete(`/interviews/${interviewsId}`)
}