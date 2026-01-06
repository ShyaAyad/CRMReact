import axios from "axios";

// url
const url = `http://localhost:8000/api/v1/`;

// projects endpoints
export const getAllProjects = ( page = 1 ) => axios.get(url + `projects?page=${page}`);

// clients endpoints
export const getAllClients = (page = 1) => axios.get(url + `clients?page=${page}`);

// tasks endpoints
export const getAllTasks = (page = 1) => axios.get(url + `tasks?page=${page}`);

// loging user in 
export const logIn = (email, password) => axios.post(url + `login`, {email, password});