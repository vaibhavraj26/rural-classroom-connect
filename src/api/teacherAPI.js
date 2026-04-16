import axios from './client';

const API_BASE = '/teacher';

export const teacherAPI = {
  getDashboard: async () => {
    return axios.get(`${API_BASE}/dashboard`);
  },

  createClass: async (data) => {
    return axios.post('/classes', data);
  },

  getClasses: async () => {
    return axios.get('/classes?teacher=me');
  },

  deleteClass: async (id) => {
    return axios.delete(`/classes/${id}`);
  },

  updateClass: async (id, data) => {
    return axios.put(`/classes/${id}`, data);
  },

  uploadMaterial: async (classId, file, title, description) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (description) formData.append('description', description);

    return axios.post(`/materials/${classId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getMaterials: async (classId) => {
    return axios.get(`/materials/${classId}`);
  },

  createAssignment: async (data) => {
    // data can contain file if we decide to allow attachments for assignment descriptions
    // For now assuming simple JSON creation
    return axios.post('/assignments', data);
  },

  getAllAssignments: async () => {
    return axios.get('/teacher/assignments');
  },

  getAssignments: async (classId) => {
    return axios.get(`/assignments/class/${classId}`);
  },

  getSubmissions: async (assignmentId) => {
    return axios.get(`/assignments/${assignmentId}/submissions`);
  },

  gradeSubmission: async (submissionId, grade, feedback) => {
    return axios.put(`/assignments/submission/${submissionId}`, { grade, feedback });
  },

  startLiveClass: async (classId) => {
    // Placeholder
    return { data: { success: true, roomId: `room-${classId}` } };
  },

  markAttendance: async (data) => {
    return axios.post('/attendance', data);
  },

  getClassAttendance: async (classId, date) => {
    let url = `/attendance/class/${classId}`;
    if (date) {
      url += `?date=${date}`;
    }
    return axios.get(url);
  },

  getClassStudents: async (classId) => {
    const response = await axios.get(`/classes/${classId}`);
    // Return accessing students array from the class object
    return { data: response.data.students };
  }
};
