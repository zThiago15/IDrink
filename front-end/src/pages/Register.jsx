import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { newRegister } from '../services/user';
import imgAccount from '../imgs/Account.gif';
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
      if (
        regexEmail.test(user.email)
        && user.password.length >= MIN_LENGTH_PASSWORD
        && user.name.length >= MIN_LENGTH_NAME
      ) {
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
    <div className="container min-h-screen mx-auto py-4">
      <div className="min-w-[200px] mx-auto w-3/5 max-w-[350px]">
        <img src={ imgAccount } className="mx-auto w-full" alt="img de login" />
      </div>
      <h1
        className="text-center md:text-5xl text-3xl
      text-[#404140] font-bold tracking-wider"
      >
        Criar conta
      </h1>
      <form
        className="mx-auto flex flex-col md:w-1/2
      max-w-[600px] w-3/4"
      >
        <div className="flex flex-col items-center py-6 w-full">
          <label className="w-full" htmlFor="name">
            Nome
            <input
              className="placeholder-gray-500
            border border-gray-300 rounded-t-md
            w-full px-2 py-2 md:text-[21px] text-md"
              placeholder="Nome"
              type="text"
              name="name"
              data-testid={ dataTestIds[6] }
              onChange={ handleInput }
              value={ user.name }
            />
          </label>

          <label className="w-full" htmlFor="email">
            <input
              className="placeholder-gray-500
                          border border-gray-300
                          w-full px-2 py-2 md:text-[21px] text-md"
              placeholder="Email"
              type="text"
              name="email"
              data-testid={ dataTestIds[7] }
              onChange={ handleInput }
              value={ user.email }
            />
          </label>

          <label className="w-full" htmlFor="password">
            <input
              className="placeholder-gray-500 w-full px-2 py-2
             border border-gray-300 rounded-b-md md:text-[21px] text-md"
              placeholder="Senha"
              type="text"
              name="password"
              data-testid={ dataTestIds[8] }
              onChange={ handleInput }
              value={ user.password }
            />
          </label>
        </div>

        <div className="w-full">
          <button
            className="bg-[#f81127] rounded
text-white drop-shadow-md w-full px-10 py-2
hover:opacity-80 mb-1 md:text-[21px] text-md cursor-pointer disabled:opacity-20"
            type="button"
            disabled={ disabledBtnLogin }
            data-testid={ dataTestIds[9] }
            onClick={ newAccount }
          >
            Criar conta
          </button>
          <Link to="/login">
            <button
              type="button"
              className="bg-[#f81127] rounded
            text-white drop-shadow-md w-full px-10 py-2
            hover:opacity-80 mb-1 md:text-[21px] text-md cursor-pointer"
            >
              Já tenho uma conta !
            </button>
          </Link>
        </div>

        {alert && (
          <p
            className='mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3
            rounded relative" role="alert"'
            data-testid={ dataTestIds[10] }
          >
            {alert}
          </p>
        )}
      </form>
    </div>
  );
}
