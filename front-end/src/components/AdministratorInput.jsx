import React, { useState } from 'react';
import adminCreateUser from '../helpers/AdmCreate';
import dataTestIds from '../utils/dataTestIds';
import NavBarAdm from './navBarAdm';

export default function RegisterForm() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState(false);

  const validateForm = () => {
    const MIN_LENGTH_PASSWORD = 6;
    const MIN_LENGTH_NAME = 12;
    const isNameValid = userName.length >= MIN_LENGTH_NAME;
    const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = userPassword.length >= MIN_LENGTH_PASSWORD;
    return !(isEmailValid && isPasswordValid && isNameValid);
  };

  const buttonRegister = async (event) => {
    const CONFLICT = 409;
    event.preventDefault();
    try {
      const newUser = await adminCreateUser({
        name: userName,
        email: userEmail,
        role,
        password: userPassword,
      });
      console.log(newUser);
      if (Number(newUser.status) === CONFLICT) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <NavBarAdm />
      {
        error && <span data-testid={ dataTestIds[74] }>Usuário já existe!</span>
      }
      <form onSubmit={ buttonRegister }>
        <label htmlFor="name">
          Nome
          <input
            data-testid={ `${dataTestIds[64]}` }
            placeholder="Nome"
            type="text"
            id="name"
            value={ userName }
            onChange={ ({ target }) => setUserName(target.value) }
          />
        </label>

        <label htmlFor="email">
          Login
          <input
            data-testid={ `${dataTestIds[65]}` }
            placeholder="Ex: your@email.com"
            type="email"
            id="email"
            value={ userEmail }
            onChange={ ({ target }) => setUserEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid={ `${dataTestIds[66]}` }
            placeholder="******"
            type="password"
            id="password"
            value={ userPassword }
            onChange={ ({ target }) => setUserPassword(target.value) }
          />
        </label>

        <label htmlFor="user-type">
          Tipo
          <select
            id="user-type"
            data-testid={ `${dataTestIds[68]}` }
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
          >
            <option value="" disabled hidden>Escolha o tipo</option>
            <option value="customer">Consumidor</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

        <button
          type="submit"
          data-testid={ `${dataTestIds[67]}` }
          disabled={ validateForm() }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
