import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { newRegister } from '../services/user';
import dataTestIds from '../utils/dataTestIds';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');
  const [disabledBtnLogin, setDisableBtnLogin] = useState(true);
  const MIN_LENGTH_PASSWORD = 6;
  const MIN_LENGTH_NAME = 12;
  const CONFLICT_ERROR = 409;

  useEffect(() => {
    const validateInputs = () => {
      const regexEmail = /\S+@\S+\.\S+/;
      if (regexEmail.test(user.email) && user.password.length >= MIN_LENGTH_PASSWORD
      && user.name.length >= MIN_LENGTH_NAME) {
        return setDisableBtnLogin(false);
      }
      return setDisableBtnLogin(true);
    };
    validateInputs();
  }, [user]);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const newAccount = async () => {
    try {
      await newRegister(user);
      navigate('/customer/products');
    } catch (error) {
      if (error.response.status === CONFLICT_ERROR) {
        return setAlert('Usuário já cadastrado!');
      }
      setAlert('Aconteceu algum problema, tente novamente mais tarde!');
    }
  };

  return (
    <div className="Register-container">
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="name">
          Nome Completo
          <input
            type="text"
            name="name"
            data-testid={ dataTestIds[6] }
            onChange={ handleInput }
            value={ user.name }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            data-testid={ dataTestIds[7] }
            onChange={ handleInput }
            value={ user.email }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="text"
            name="password"
            data-testid={ dataTestIds[8] }
            onChange={ handleInput }
            value={ user.password }
          />
        </label>

        <button
          type="button"
          disabled={ disabledBtnLogin }
          data-testid={ dataTestIds[9] }
          onClick={ newAccount }
        >
          Cadastrar
        </button>
        <Link to="/login">Já tenho uma conta</Link>
        {alert && <p data-testid={ dataTestIds[10] }>{alert}</p>}
      </form>
    </div>
  );
}
