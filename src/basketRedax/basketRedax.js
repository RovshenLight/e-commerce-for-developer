import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const loadBasketFromCookies = () => {
  const basketCookie = Cookies.get('basket');
  return basketCookie ? JSON.parse(basketCookie) : { products: [], counter: 0, total: 0 };
};

const saveBasketToCookies = (state) => {
  Cookies.set('basket', JSON.stringify(state), { expires: 7 });
};

const roundToTwoDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

const basketSlice = createSlice({
  name: "basket",
  initialState: loadBasketFromCookies(),
  reducers: {
    addProduct: (state, action) => {
      const { price, counter } = action.payload;
      state.counter += counter;
      state.products.push(action.payload);
      state.total += price * counter;
      saveBasketToCookies(state); 
    },
    clearBasket: (state) => {
      state.products = [];
      state.counter = 0;
      state.total = 0;
      saveBasketToCookies(state);
      state.total = roundToTwoDecimals(state.total);
      saveBasketToCookies(state); 
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(p => p.id === productId);

      if (productIndex >= 0) {
        const product = state.products[productIndex];
        state.counter -= product.counter;
        state.total -= product.price * product.counter;
        state.total = roundToTwoDecimals(state.total);
        if (state.total < 0) {
          state.total = 0;
        }
        state.products.splice(productIndex, 1);
        saveBasketToCookies(state); 
      }
    }
  }
});

export const { addProduct, clearBasket, removeProduct } = basketSlice.actions;
export default basketSlice.reducer;
