import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Product from '../components/Product';
import { getProducts } from '../services/product';
import datatestids from '../utils/dataTestIds';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const saveProducts = async () => {
      const data = await getProducts(token);
      setProducts([...data]);
    };
    saveProducts();
  }, [token]);

  const checkoutPage = () => {
    if (totalPrice > 0) {
      navigate('/customer/checkout');
    }
  };

  return (
    <div className="container mx-auto w-full min-h-screen min-">
      <NavBar />
      {products.map((product) => (
        <Product
          key={ product.id }
          product={ product }
          totalPriceFunc={ setTotalPrice }
          totalPrice={ totalPrice }
        />
      ))}
      <button
        onClick={ () => checkoutPage() }
        type="button"
        disabled={ totalPrice === 0 }
        data-testid={ datatestids[21] }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          {totalPrice.toFixed(2).replace('.', ',')}
        </p>
      </button>
    </div>
  );
}
