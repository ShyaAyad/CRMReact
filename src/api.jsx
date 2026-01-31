import axios from "axios";

// url
const url = `http://localhost:8000/api/v1/`;

// log in
export const logIn = (email, password) =>
  axios.post(url + `login`, { email, password });

// register
export const register = (name, email, password) => {
  return axios.post(url + `register`, { name, email, password });
};

// logout
export const logOut = () => {
  const token = localStorage.getItem("token");
  return axios.post(url + `logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// projects endpoints
export const getAllProjects = (page = 1) =>
  axios.get(url + `projects?page=${page}`);

export const getProject = async (id) => {
  const token = localStorage.getItem("token");

  const resp = await axios.get(url + `projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

export const deleteProject = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(url + `projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProject = (projectData) => {
  const token = localStorage.getItem("token");
  return axios.post(url + `projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProject = (id, data) => {
  const token = localStorage.getItem("token");
  return axios.put(url + `projects/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// clients endpoints
export const getAllClients = (page = 1) =>
  axios.get(url + `clients?page=${page}`);

export const clientsForDropdown = () => {
  const token = localStorage.getItem("token");
  return axios.get(url + `clients/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const createClient = (clientData) => {
  const token = localStorage.getItem("token");
  return axios.post(url + `clients`, clientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteClient = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(url + `clients/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateClient = async (id, data) => {
  const token = localStorage.getItem("token");
  const resp = await axios.put(url + `clients/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data.data;
};

export const searchClient = (client) => {
  const token = localStorage.getItem("token");
  return axios.get(url + `clients/search?name=${client}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const clientDetails = (id) => axios.get(url + `clients/${id}`);

// tasks endpoints
export const getAllTasks = (page = 1) => axios.get(url + `tasks?page=${page}`);

export const updateTaskStatus = (id, data) => {
  const token = localStorage.getItem('token');
  return axios.patch(url + `tasks/updateStatus/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getTasksByIds = (ids) => {
  const token = localStorage.getItem("token");
  const query = ids.join(",");

  return axios.get(url + `tasks?ids=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// trashed data 
export const getTrasheProjects = () => {
  // const token = localStorage.getItem("token");
  return axios.get(url + `projects/trashed`);
}

export const getTrashedClients = () => {
  return axios.get(url + `clients/trashed`);
}