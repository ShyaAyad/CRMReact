import axios from "axios";
import { secureStorage } from "./utils/secureStorege";

// url
const url = `http://localhost:8000/api/v1/`;

// log in
export const logIn = async (email, password) => {
  const response = await axios.post(url + `login`, { email, password });
  if (response.data.token) {
    await secureStorage.setToken(response.data.token); // set token after login
  }
  return response;
};

// register
export const register = async (name, email, password) => {
  const response = await axios.post(url + `register`, {
    name,
    email,
    password,
  });
  if (response.data.token) {
    await secureStorage.setToken(response.data.token); // set token after register
  }
  return response;
};

// logout
export const logOut = async () => {
  const token = await secureStorage.getToken(); // get token securily for electron

  const response = await axios.post(
    url + `logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  await secureStorage.removeToken(); // remove token after logout

  return response;
};

// projects endpoints
export const getAllProjects = (page = 1) =>
  axios.get(url + `projects?page=${page}`);

export const getProject = async (id) => {
  const token = await secureStorage.getToken();
  const resp = await axios.get(url + `projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return resp.data;
};

export const deleteProject = async (id) => {
  const token = await secureStorage.getToken();
  return axios.delete(url + `projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createProject = async (projectData) => {
  const token = await secureStorage.getToken();
  return axios.post(url + `projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateProject = async (id, data) => {
  const token = await secureStorage.getToken();
  return axios.put(url + `projects/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

// clients endpoints
export const getAllClients = (page = 1) =>{
  return axios.get(url + `clients?page=${page}`);
}

export const clientsForDropdown = async () => {
  const token = await secureStorage.getToken();
  return axios.get(url + `clients/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createClient = async (clientData) => {
  const token = await secureStorage.getToken();
  return axios.post(url + `clients`, clientData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteClient = async (id) => {
  const token = await secureStorage.getToken();
  return axios.delete(url + `clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const updateClient = async (id, data) => {
  const token = await secureStorage.getToken();
  const resp = await axios.put(url + `clients/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return resp.data.data;
};

export const searchClient = async (client) => {
  const token = await secureStorage.getToken();
  return axios.get(url + `clients/search?name=${client}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const clientDetails = (id) => axios.get(url + `clients/${id}`);

// tasks endpoints
export const getAllTasks = (page = 1) => axios.get(url + `tasks?page=${page}`);

export const createTask = async(taskData) => {
  const token = await secureStorage.getToken();
  return axios.post(url + `tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    }
  })
}

export const updateTaskStatus = async (id, data) => {
  const token = await secureStorage.getToken();
  return axios.patch(url + `tasks/updateStatus/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getTasksByIds = async (ids) => {
  const token = await secureStorage.getToken();
  const query = ids.join(",");

  return axios.get(url + `tasks?ids=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

// /projects/filter
// `clients/search?name=${client}`

// filter data 
export const filterProjects = async(filter) => {
  const token = await secureStorage.getToken();
  return axios.get(url + `projects/filter?status=${filter}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const filterClients = async(filter) => {
  const token = await secureStorage.getToken();
  return axios.get(url + `clients/filter?status=${filter}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

// get trashed data
export const getTrasheProjects = async () => {
  const token = await secureStorage.getToken();
  return axios.get(url + `projects/trashed`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getTrashedClients = async () => {
  const token = await secureStorage.getToken();
  return axios.get(url + `clients/trashed`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

// restore deleted data
export const restoreProject = async (id) => {
  const token = await secureStorage.getToken();
  return axios.post(
    url + `projects/${id}/restore`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
};

export const restoreClient = async (id) => {
  const token = await secureStorage.getToken();

  return axios.post(
    url + `clients/${id}/restore`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
};

// delete data permanently
export const deleteTrashedProject = async(id) => {
  const token = await secureStorage.getToken();

  return axios.delete(url + `projects/${id}/force`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const deleteTrashedClient = async(id) => {
  const token = await secureStorage.getToken();

  return axios.delete(url + `client/${id}/force`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

/*  
  POST / PUT / PATCH
  With headers but no data → {}, config

  e.g. 

  POST
  return axios.post(url + `clients/${id}/restore`,
   {}, <---- forget this and you will cause 401 error 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  PUT
  return axios.put(url + `projects/${id}`,
  data, <---- data or {} if no data 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  GET / DELETE
  Only config

  e.g.
  GET
  return axios.get(url + `clients/trashed`, {
    headers: { <--- only config here no body 
      Authorization: `Bearer ${token}`,
    },
  });

*/
