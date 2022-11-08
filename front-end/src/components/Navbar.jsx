import datatestids from '../utils/dataTestIds';

export default function NavBar() {
  const { name, role } = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav className="flex bg-red-600">
      {role === 'customer' && (
        <li>
          <a href="/customer/products" data-testid={ datatestids[11] }>
            Produtos
          </a>
        </li>
      )}
      <li>
        <a
          href={ role === 'customer' ? '/customer/orders' : '/seller/orders' }
          data-testid={ datatestids[12] }
        >
          {role === 'customer' ? 'Meus pedidos' : 'Pedidos'}
        </a>
      </li>
      <li>
        <a data-testid={ datatestids[13] } href="#t">
          {name}
        </a>
      </li>
      <li>
        <a data-testid={ datatestids[14] } href="/login" onClick={ () => logout() }>
          Sair
        </a>
      </li>
    </nav>
  );
}
