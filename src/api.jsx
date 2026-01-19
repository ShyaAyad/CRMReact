import axios from "axios";

// url
const url = `http://localhost:8000/api/v1/`;

// projects endpoints
export const getAllProjects = (page = 1) =>
  axios.get(url + `projects?page=${page}`);

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
}

// clients endpoints
export const getAllClients = (page = 1) =>
  axios.get(url + `clients?page=${page}`);

export const createClient = (clientData) => {
  const token = localStorage.getItem("token");
  return axios.post(url + `clients`, clientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteClient = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(url + `clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const searchClient = (client) => {
  const token = localStorage.getItem("token");
  return axios.get(url + `clients/search?name=${client}`, {
     headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// get client details
export const clientDetails = (id) => axios.get(url + `clients/${id}`);

// tasks endpoints
export const getAllTasks = (page = 1) => axios.get(url + `tasks?page=${page}`);

// log in
export const logIn = (email, password) =>
  axios.post(url + `login`, { email, password });
// logout
export const logOut = () => {
  const token = localStorage.getItem("token");
  axios.post(url + `logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
