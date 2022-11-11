export const mockUser = {
  name: 'Nome Da Pessoa Usuária',
  email: 'email@dominio.com',
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCWlua75eT8uJnSbfadNE',
};
export const passwordValid = '12345678';

export const mockUserAdmin = {
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

export const passwordAdmin = '--adm2@21!!--';

export const errorNotFound = {
  response: {
    status: 404,
  },
};

export const errorConflit = {
  response: {
    status: 409,
  },
};
