import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticationUser } from '../services/user';
import { actionUserLogin } from '../redux/userSlice';
import imgLogin from '../imgs/login.gif';
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
    if (userStorage.token) navigate('/customer/products');
  }, [userStorage.token, navigate]);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const newSession = async () => {
    try {
      const response = await authenticationUser(user);
      dispatch(actionUserLogin(response));
      localStorage.setItem('user', JSON.stringify(response));

      navigate('/');
    } catch (error) {
      if (error.response.status === NOT_FOUND) {
        return setAlert('Usuário não encontrado!');
      }
      setAlert('Aconteceu algum problema, tente novamente mais tarde!');
    }
  };

  return (
    <div className="container min-h-screen mx-auto py-4">
      <div className="min-w-[250px] mx-auto w-3/5 max-w-[500px]">
        <img src={ imgLogin } className="mx-auto w-full" alt="img de login" />
      </div>
      <h1
        className="text-center md:text-5xl text-3xl
      text-[#404140] font-bold tracking-wider"
      >
        <span className="text-[#f81127] md:text-6xl text-4xl">I</span>
        Drinks
      </h1>
      <form
        className="mx-auto flex flex-col md:w-1/2
        max-w-[600px] w-3/4"
      >
        <div className="flex flex-col items-center py-6 w-full">
          <label className="w-full" htmlFor="email">
            <input
              className="placeholder-gray-500
              border border-gray-300 rounded-t-md
              w-full px-2 py-2 md:text-[21px] text-md"
              type="email"
              placeholder="Email"
              name="email"
              data-testid={ dataTestIds[1] }
              onChange={ handleInput }
              value={ user.email }
            />
          </label>

          <label className="w-full" htmlFor="password">
            <input
              className="placeholder-gray-500 w-full px-2 py-2
              border border-gray-300 rounded-b-md md:text-[21px] text-md"
              type="password"
              placeholder="Senha"
              name="password"
              data-testid="common_login__input-password"
              onChange={ handleInput }
              value={ user.password }
            />
          </label>
        </div>
        <div className="w-full">
          <button
            className="bg-[#f81127] rounded
            text-white drop-shadow-md w-full px-10 py-2
            hover:opacity-80 mb-1 md:text-[21px] text-md cursor-pointer"
            type="button"
            disabled={ disabledBtnLogin }
            data-testid="common_login__button-login"
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
              data-testid="common_login__button-register"
            >
              Register
            </button>
          </Link>
        </div>
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
