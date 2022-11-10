import React from 'react';
import { useNavigate } from 'react-router-dom';
import datatestids from '../utils/dataTestIds';

function NavBarAdm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <section>
      <button
        type="button"
        data-testid={ datatestids[12] }
      >
        GERENCIAR USUÁRIOS
      </button>
      <p
        data-testid={ datatestids[13] }
      >
        { user.name }
      </p>
      <button
        type="button"
        data-testid={ datatestids[14] }
        onClick={ logout }
      >
        Sair
      </button>
    </section>
  );
}

export default NavBarAdm;
