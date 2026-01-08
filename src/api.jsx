import axios from "axios";

// url
const url = `http://localhost:8000/api/v1/`;

// projects endpoints
export const getAllProjects = (page = 1) =>
  axios.get(url + `projects?page=${page}`);

// clients endpoints
export const getAllClients = (page = 1) =>
  axios.get(url + `clients?page=${page}`);

export const createClient = (clientData) => {
  const token = localStorage.getItem("token");
  axios.post(url + `clients`, clientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// tasks endpoints
export const getAllTasks = (page = 1) => axios.get(url + `tasks?page=${page}`);

// loging
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

// get client details
export const clientDetails = (id) => axios.get(url + `clients/${id}`);
