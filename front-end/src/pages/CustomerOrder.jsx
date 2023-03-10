import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { getAllOrders } from '../services/customerOrders';
import dataTestIds from '../utils/dataTestIds';

export default function OrderCustomer() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const apiOrders = await getAllOrders();
      setOrders(apiOrders);
    };
    getOrders();
  }, []);
  return (
    <div>
      <NavBar />
      {orders && orders.map((sale) => {
        const { id, saleDate, status, totalPrice } = sale;
        const priceTotal = totalPrice.replace('.', ',');
        const date = moment(new Date(saleDate)).format('DD/MM/YYYY');
        return (
          <button
            type="button"
            key={ id }
            onClick={ () => navigate(`/customer/orders/${id}`) }
          >
            <p data-testid={ `${dataTestIds[33]}${id}` }>
              Pedido
              <span>{id}</span>
            </p>
            <p data-testid={ `${dataTestIds[34]}${id}` }>{status}</p>
            <p data-testid={ `${dataTestIds[35]}${id}` }>{date}</p>
            <span data-testid={ `${dataTestIds[36]}${id}` }>{priceTotal}</span>
          </button>
        );
      })}
    </div>
  );
}
