async function adminCreateUser(userData, token) {
  try {
    const { data } = await axios.post('http://localhost:3001/admin/createuser', {
      ...userData,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response;
  }
}

export default adminCreateUser;
