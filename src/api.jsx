import axios from "axios";

// url
const url = `http://localhost:8000/api/v1/`;

// projects endpoints
export const getAllProjects = ( page = 1 ) => axios.get(url + `projects?page=${page}`);

// clients endpoints
export const getAllClients = () => axios.get(url + 'clients');

// tasks endpoints
export const getAllTasks = () => axios.get(url + 'tasks');