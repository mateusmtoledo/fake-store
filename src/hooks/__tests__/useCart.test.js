import { renderHook } from '@testing-library/react';
import useCart from '../useCart';
import products from '../../fakeData/products.json';
import { act } from 'react-dom/test-utils';

describe('useCart', () => {
  describe('cart', () => {
    it('is initially empty', () => {
      const { result } = renderHook(useCart);
      expect(result.current.cart.length).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('adds item to cart', async () => {
      const { result } = renderHook(useCart);
      act(() => result.current.addToCart(products[0]));
      expect(result.current.cart[0].product).toBe(products[0]);
    });

    it('does not add item twice', () => {
      const { result } = renderHook(useCart);
      act(() => {
        result.current.addToCart(products[0]);
        result.current.addToCart(products[1]);
        result.current.addToCart(products[0]);
        result.current.addToCart(products[2]);
      });
      expect(result.current.cart.length).toBe(3);
      expect(result.current.cart[0].product).toBe(products[0]);
      expect(result.current.cart[1].product).toBe(products[1]);
      expect(result.current.cart[2].product).toBe(products[2]);
    });
  });

  describe('removeFromCart', () => {
    it('removes item from cart', () => {
      const { result } = renderHook(useCart);
      act(() => {
        result.current.addToCart(products[0]);
        result.current.addToCart(products[1]);
        result.current.addToCart(products[2]);
        result.current.addToCart(products[3]);
        result.current.addToCart(products[4]);
      });
      expect(result.current.cart.length).toBe(5);
      act(() => result.current.removeFromCart(products[2].id));
      expect(result.current.cart.length).toBe(4);
      expect(result.current.cart[0].product).toBe(products[0]);
      expect(result.current.cart[1].product).toBe(products[1]);
      expect(result.current.cart[2].product).toBe(products[3]);
      expect(result.current.cart[3].product).toBe(products[4]);
    });

    it('does not change cart when product is not found', () => {
      const { result } = renderHook(useCart);
      act(() => {
        result.current.addToCart(products[0]);
        result.current.addToCart(products[1]);
      });
      expect(result.current.cart.length).toBe(2);
      act(() => result.current.removeFromCart(products[2].id));
      expect(result.current.cart.length).toBe(2);
    });
  });

  describe('updateQuantity', () => {
    it('updates the quantity of given cart item', () => {
      const { result } = renderHook(useCart);
      act(() => {
        result.current.addToCart(products[0]);
        result.current.addToCart(products[1]);
        result.current.addToCart(products[2]);
        result.current.addToCart(products[3]);
        result.current.addToCart(products[4]);
      });
      expect(result.current.cart.length).toBe(5);
      act(() => result.current.updateQuantity(products[2].id, 3));
      expect(result.current.cart[0].quantity).toBe(1);
      expect(result.current.cart[1].quantity).toBe(1);
      expect(result.current.cart[2].quantity).toBe(3);
      expect(result.current.cart[3].quantity).toBe(1);
      expect(result.current.cart[3].quantity).toBe(1);
    });
  });
});
