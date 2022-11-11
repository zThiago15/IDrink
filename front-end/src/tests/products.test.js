/* eslint-disable max-len */
import { screen } from '@testing-library/react';
import products from './mocks/product.mock';
import dataTestIds from '../utils/dataTestIds';

import renderWithRouter from './utils/renderWithRouter';

describe('Testa o correto funcionamento da pagina de Products', () => {
  beforeEach(() => {
    getProducts = jest.fn().mockReturnValue(products);
    global.localStorage.getItem = jest.fn(() => Promise.resolve({
      token: 'test1234',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se botoões do cabeçalho existem', () => {
    renderWithRouter('/customer/products');
    const btnProducts = screen.getByTestId('customer_products__element-navbar-link-products');
    const btnOrders = screen.getByTestId('customer_products__element-navbar-link-orders');
    const btnName = screen.getByTestId('customer_products__element-navbar-user-full-name');
    const btnLogout = screen.getByTestId('customer_products__element-navbar-link-logout');

    expect(btnProducts).toBeInTheDocument(btnProducts);
    expect(btnOrders).toBeInTheDocument(btnOrders);
    expect(btnName).toBeInTheDocument(btnName);
    expect(btnLogout).toBeInTheDocument(btnLogout);
  });

  it('Verifica se os produtos com nome, imagem e preço são renderizados', () => {
    renderWithRouter('/customer/products');

    products.forEach((product, index) => {
      const name = screen.getByTestId(`${dataTestIds[15]}${index}`);
      const price = screen.getByTestId(`${dataTestIds[16]}${index}`);
      const img = screen.getByTestId(`${dataTestIds[17]}${index}`);

      expect(price).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(img).toBeInTheDocument();
    });
  });
});
