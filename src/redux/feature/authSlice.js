import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {API, base_url} from '../Api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorToast, successToast} from '../../custom/customToast';
import axios from 'axios';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
};

export const login = createAsyncThunk('login', async (params, thunkApi) => {
  try {
    // Create form data with identity and otp
    const formData = new FormData();
    formData.append('useres_identity', params.data.useres_identity);
    formData.append('useres_password', params.data.useres_password);

    // Configure request headers
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    // Create request options
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    // Make POST request to verify OTP
    const response = await fetch(
      'https://server-php-8-3.technorizen.com/loveeat/api/restaurant/auth/login',
      requestOptions,
    );

    // Parse response as JSON
    const responseData = await response.json();

    console.log('Response login :', responseData.data);

    // Handle successful response
    if (responseData.success) {
      successToast(responseData.message);
      thunkApi.dispatch(loginSuccess(responseData.data));
      // Assuming ScreenNameEnum.CREATE_PASSWORD is imported properly

      const restaurantRegister = responseData.data.restaurant_register;

      if (restaurantRegister) {
        params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        params.navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
      }
    } else {
      errorToast(responseData.message);
    }

    // Return response data
    return responseData.data;
  } catch (error) {
    console.error('Error:', error);
    errorToast('Network error');
    // Reject with error
    throw error;
  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
   
  },
});

export const {loginSuccess} = AuthSlice.actions;

export default AuthSlice.reducer;
