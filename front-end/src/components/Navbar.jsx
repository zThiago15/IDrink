import datatestids from '../utils/dataTestIds';

export default function NavBar() {
  const userStorage = JSON.parse(localStorage.getItem('user')) || 'notFound';

  return (
    <nav className="flex bg-red-600">
      {userStorage.role === 'customer' && (
        <li>
          <a href="/customer/products" data-testid={ datatestids[11] }>
            Produtos
          </a>
        </li>
      )}
      <li>
        <a
          href={
            userStorage.role === 'customer'
              ? '/customer/orders'
              : '/seller/orders'
          }
          data-testid={ datatestids[12] }
        >
          {userStorage.role === 'customer' ? 'Meus pedidos' : 'Pedidos'}
        </a>
      </li>
      <li>
        <a data-testid={ datatestids[13] } href="#t">
          {userStorage.name}
        </a>
      </li>
      <li>
        <a
          data-testid={ datatestids[14] }
          href="/login"
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair
        </a>
      </li>
    </nav>
  );
}
