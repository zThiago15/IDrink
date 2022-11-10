/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react-func/max-lines-per-function */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUserStore, mockProducts, mockseller } from './mocks/customer.mock';
import * as products from '../services/product';
import * as seller from '../services/user';

import renderWithRouter from './utils/renderWithRouter';

const preCheckout = async () => {
  jest.spyOn(products, 'getProducts');
  products.getProducts.mockReturnValue(mockProducts);
  localStorage.setItem('user', JSON.stringify(mockUserStore));
  renderWithRouter('/customer/products');
  userEvent.click(await screen.findByTestId('customer_products__button-card-add-item-1'));
  userEvent.click(await screen.findByTestId('customer_products__button-card-add-item-2'));
  userEvent.click(await screen.findByTestId('customer_products__button-card-add-item-3'));
  userEvent.click(await screen.findByTestId('customer_products__button-cart'));
};

describe('Testa o correto funcionamento da pagina de checkout', () => {
  beforeEach(() => {
    jest.spyOn(seller, 'getUserSalles');
    seller.getUserSalles.mockReturnValue(mockseller);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Verifica o correto funcionamento do carrinho de compra', () => {
    it(`Verifica se todos os produtos
     são renderizados corretamente na tela`, async () => {
      await preCheckout();
      const product1 = screen
        .getByTestId('customer_checkout__element-order-table-name-0');
      const product2 = screen
        .getByTestId('customer_checkout__element-order-table-name-1');
      const product3 = screen
        .getByTestId('customer_checkout__element-order-table-name-2');
      expect(product1).toBeInTheDocument();
      expect(product2).toBeInTheDocument();
      expect(product3).toBeInTheDocument();
    });
    it(`Verifica se o produto 1 possui qtd, preço e s
    ubtotal esperado remover o produto 1 da tela`, async () => {
      await preCheckout();
      const name = screen.getByTestId('customer_checkout__element-order-table-name-0');
      const price = screen
        .getByTestId('customer_checkout__element-order-table-quantity-0');
      const subtotal = screen
        .getByTestId('customer_checkout__element-order-table-sub-total-0');
      expect(name.textContent).toEqual('Skol Lata 250ml');
      expect(price.textContent).toEqual('1');
      expect(subtotal.textContent).toEqual('2,20');
    });
    it('Verifica se é possível remover o produto 1 da tela', async () => {
      await preCheckout();
      const product1 = screen
        .getByTestId('customer_checkout__element-order-table-name-0');
      const buttonRemove = screen
        .getByTestId('customer_checkout__element-order-table-remove-0');
      userEvent.click(buttonRemove);
      expect(product1.textContent).not.toEqual('Skol Lata 250ml');
    });
    it('Verifica se o valor total do carrinho é Total: R$ 12,19 ', async () => {
      await preCheckout();
      const total = screen.getByTestId('customer_checkout__element-order-total-price');
      expect(total.textContent).toEqual('Total: R$ 12,19');
    });
  });
  describe('Verifica o correto funcionamento do detalhe de entrega', () => {
    it('Verifica se é possível escolher o vendedor, endereço e numero', async () => {
      await preCheckout();
      const sellerName = screen.getByTestId('customer_checkout__select-seller');
      const address = screen.getByTestId('customer_checkout__input-address');
      const num = screen.getByTestId('customer_checkout__input-address-number');
      userEvent.selectOptions(sellerName, '2');
      expect(sellerName).toHaveValue('2');
      userEvent.type(address, 'teste');
      expect(address).toHaveValue('teste');
      userEvent.type(num, '2');
      expect(num).toHaveValue('2');
    });
    it('Verifica se o botão finalizar pedido existe', async () => {
      await preCheckout();
      const button = screen.getByTestId('customer_checkout__button-submit-order');
      expect(button).toBeInTheDocument();
    });
  });
});
