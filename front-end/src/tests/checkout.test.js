/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react-func/max-lines-per-function */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { mockUserStore, mockProducts } from './mocks/customer.mock';

import renderWithRouter from './utils/renderWithRouter';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe('Testa o correto funcionamento da pagina de Login', () => {
  beforeEach(() => {
    const mockState = {
      products: mockProducts,
    };
    Redux.useSelector.mockImplementation((callback) => callback(mockState));
    localStorage.setItem('user', JSON.stringify(mockUserStore));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Verifica se os produtos são renderizados corretamente na tela', () => {
    renderWithRouter('/customer/checkout');
    const product1 = screen.getByTestId('customer_checkout__element-order-table-name-0');
  });
});
