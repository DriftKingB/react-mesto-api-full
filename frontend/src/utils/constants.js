export const apiConfig = {
  baseUrl: 'https://api.domesto.students.nomoredomains.icu',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};

export const authConfig = {
  baseUrl: 'https://api.domesto.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
  },
};
