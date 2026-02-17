import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../Api';
import {ToastAndroid} from 'react-native';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  wallePrice: '00',
  products: [],
  productDetail: {},
  cart: [],
};
export const getProudctDetails = createAsyncThunk(
  'auth/getProudctDetails',
  async ({endPoint, id}, thunkAPI) => {
    try {
      const response = await Api.getRequest(endPoint);
      if (response.message === 'API success') {
        return [{...response.data, productId: id}];
      }
      return thunkAPI.rejectWithValue('No Product found');
    } catch (error) {
      return thunkAPI.rejectWithValue('No Product found');
    }
  },
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {
    setWalletPrice: (state, action) => {
      state.wallePrice = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    setCarts: (state, actiom) => {
      state.cart = actiom.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProudctDetails.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getProudctDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.productDetail = action.payload;
    });
    builder.addCase(getProudctDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      ToastAndroid.show(action.payload, ToastAndroid.SHORT);
    });
  },
});
export const {setWalletPrice, setProducts, setProductDetail, setCarts} =
  FeatureSlice.actions;
export default FeatureSlice.reducer;
