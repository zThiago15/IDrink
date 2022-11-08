import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserSalles } from '../services/user';
import dataTestIds from '../utils/dataTestIds';

export default function CheckoutDetails({ props }) {
  const [userSelles, setUserSelles] = useState([]);
  const { infos, setInfos } = props;

  const handdleInput = ({ target }) => {
    setInfos({ ...infos, [target.name]: target.value });
  };

  useEffect(() => {
    const getSelles = async () => {
      const response = await getUserSalles();
      setUserSelles(response.data);
    };
    getSelles();
  }, []);

  return (
    <div>
      <h3>Detalhes e Endereços para Entrega</h3>
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select
          data-testid={ dataTestIds[29] }
          onChange={ handdleInput }
          name="seller"
        >
          <option>Escolha um vendedor</option>
          {userSelles
            && userSelles.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          data-testid={ dataTestIds[30] }
          type="text"
          onChange={ handdleInput }
          name="deliveryAddress"
          value={ userSelles.deliveryAddress }
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          data-testid={ dataTestIds[31] }
          type="text"
          onChange={ handdleInput }
          name="deliveryNumber"
          value={ userSelles.deliveryNumber }
        />
      </label>
    </div>
  );
}

CheckoutDetails.propTypes = {
  props: PropTypes.object,
}.isRequired;
