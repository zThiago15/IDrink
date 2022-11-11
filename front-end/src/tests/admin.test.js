import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { mockUserAdmin, passwordAdmin } from './mocks/user.mock';

import * as mockApi from '../services/user';

const routeAdm = '/admin/manage';
const INPUT_NAME = 'admin_manage__input-name';
const INPUT_PASSWORD = 'admin_manage__input-password';
const INPUT_EMAIL = 'admin_manage__input-email';

describe('Test the Admin page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should make login with Adm user', async () => {
    jest.spyOn(mockApi, 'authenticationUser');
    mockApi.authenticationUser.mockReturnValue(mockUserAdmin);
    renderWithRouter('/login');
    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByRole('button', { name: 'Login' });
    userEvent.type(inputEmail, mockUserAdmin.email);
    userEvent.type(inputPassword, passwordAdmin);
    userEvent.click(buttonLogin);
    expect(mockApi.authenticationUser).toBeCalled();
    expect(mockApi.authenticationUser)
      .toHaveBeenCalledWith({ email: mockUserAdmin.email, password: passwordAdmin });
    const navBar = await screen.findByText('GERENCIAR USUÁRIOS');
    expect(navBar).toBeInTheDocument();
  });

  it(`Checks if name input exists and
  when typing "test" it is updated `, () => {
    renderWithRouter(routeAdm);
    const inputName = screen.getByTestId(INPUT_NAME);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveValue('');
    userEvent.type(inputName, 'teste');
    expect(inputName).toHaveValue('teste');
  });

  it(`Checks if email input exists and
  when typing "test" it is updated`, () => {
    renderWithRouter(routeAdm);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    userEvent.type(inputEmail, 'teste');
    expect(inputEmail).toHaveValue('teste');
  });

  it(`Checks if password input exists and
  when typing "test" it is updated`, () => {
    renderWithRouter(routeAdm);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputPassword, 'teste');
    expect(inputPassword).toHaveValue('teste');
  });
});

describe('Should register a new user with sucess', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Checks if nav bar exists', async () => {
    renderWithRouter(routeAdm);
    const buttonRegister = screen.getByRole('button', { name: 'Cadastrar' });
    const buttonLogout = screen.getByRole('button', { name: 'Sair' });

    expect(buttonRegister).toBeDisabled();
    expect(buttonLogout).toBeInTheDocument();
  });

  it('Register a customer user', () => {
    renderWithRouter(routeAdm);
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const inputRole = screen.getByTestId('admin_manage__select-role');
    const buttonLogin = screen.getByRole('button', { name: 'Cadastrar' });

    userEvent.type(inputName, 'Administrator test');
    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, 'passwordAdmin');
    fireEvent.click(inputRole, { target: { value: 1 } });

    expect(buttonLogin).toBeEnabled();
  });

  it('Should return an conflict', async () => {
    renderWithRouter(routeAdm);
    const inputName = screen.getByTestId(INPUT_NAME);
    const inputEmail = screen.getByTestId(INPUT_EMAIL);
    const inputPassword = screen.getByTestId(INPUT_PASSWORD);
    const inputRole = screen.getByTestId('admin_manage__select-role');
    const buttonLogin = screen.getByRole('button', { name: 'Cadastrar' });

    userEvent.type(inputName, 'Administrator test');
    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, 'passwordAdmin');
    fireEvent.click(inputRole, { target: { value: 1 } });
    fireEvent.click(buttonLogin);

    const conflict = await screen.findByText('Usuário já existe!');
    expect(conflict).toBeInTheDocument();
  });
});
