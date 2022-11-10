import api from '../services';

const adminCreateUser = async (body) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const data = await api
    .post('/admin/user', body, { headers: { Authorization: `${token}` } })
    .then((response) => response.data);
  return data;
};

export default adminCreateUser;
