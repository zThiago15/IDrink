import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationUser } from '../services/user';
import { actionUserLogin } from '../redux/userSlice';
import dataTestIds from '../utils/dataTestIds';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState('');
  const [disabledBtnLogin, setDisableBtnLogin] = useState(true);
  const MIN_LENGTH_PASSWORD = 6;
  const NOT_FOUND = 404;
  const userStorage = JSON.parse(localStorage.getItem('user')) || 'notFound';

  useEffect(() => {
    const validateInputs = () => {
      const regexEmail = /\S+@\S+\.\S+/;
      if (
        regexEmail.test(user.email)
        && user.password.length >= MIN_LENGTH_PASSWORD
      ) {
        return setDisableBtnLogin(false);
      }
      return setDisableBtnLogin(true);
    };
    validateInputs();
  }, [user]);

  useEffect(() => {
    if (userStorage === 'notFound') return;
    if (userStorage.role === 'customer') {
      navigate('/customer/products');
    } else if (userStorage.role === 'seller') {
      navigate('/seller/orders');
    } else if (userStorage.role === 'administrator') {
      navigate('/admin/manage');
    }
  }, [navigate, userStorage.role, userStorage]);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const newSession = async () => {
    try {
      const response = await authenticationUser(user);
      dispatch(actionUserLogin(response));
      localStorage.setItem('user', JSON.stringify(response));

      if (response.role === 'customer') {
        navigate('/customer/products');
      } else if (response.role === 'seller') {
        navigate('/seller/orders');
      } else {
        navigate('/admin/manage');
      }
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        return setAlert('Usuário não encontrado!');
      }
      setAlert('Aconteceu algum problema, tente novamente mais tarde!');
    }
  };

  return (
    <div className="login-container">
      <h1>Drinks Delivery</h1>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            data-testid={ dataTestIds[1] }
            onChange={ handleInput }
            value={ user.email }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid={ dataTestIds[2] }
            onChange={ handleInput }
            value={ user.password }
          />
        </label>

        <button
          type="button"
          disabled={ disabledBtnLogin }
          data-testid={ dataTestIds[3] }
          onClick={ newSession }
        >
          Login
        </button>
        <Link to="/register">
          <button
            className="bg-[#f81127] rounded
            text-white drop-shadow-md w-full px-10 py-2
            hover:opacity-80 md:text-[21px] text-md "
            type="button"
            data-testid={ dataTestIds[4] }
          >
            Register
          </button>
        </Link>

        {alert && (
          <p
            className='mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3
            rounded relative" role="alert"'
            data-testid={ dataTestIds[5] }
          >
            {alert}
          </p>
        )}
      </form>
    </div>
  );
}
