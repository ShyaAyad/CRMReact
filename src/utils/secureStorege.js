// src/utils/secureStorage.js
const isElectron = () => {
  return typeof window !== 'undefined' && !!window.electronAPI;
};

export const secureStorage = {
  async setToken(token) {
    if (isElectron()) {
      await window.electronAPI.storeToken(token);
    } else {
      localStorage.setItem('token', token);
    }
  },

  async getToken() {
    if (isElectron()) {
      return await window.electronAPI.getToken();
    } else {
      return localStorage.getItem('token');
    }
  },

  async removeToken() {
    if (isElectron()) {
      await window.electronAPI.deleteToken();
    } else {
      localStorage.removeItem('token');
    }
  }
};