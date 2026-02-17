import axios from 'axios';
import Constants from './Constants';

/**
 * Api class that handles HTTP requests to the API.
 */
class Api {
  /**
   * Axios instance with default configuration.
   * @type {AxiosInstance}
   */
  axiosInstance;

  /**
   * Constructor that initializes the Axios instance with default configuration.
   */
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Constants.MainUrl,
      headers: {
        'content-type': 'application/json',
      },
    });

    /**
     * Interceptor that catches 401 responses and redirects to login screen.
     */
    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          return;
          Alert.alert(
            'Session Expired',
            'Your session has expired. Please log in again.',
            [
              {
                text: 'OK',
                onPress: () => this.redirectToLogin(),
              },
            ],
            {cancelable: false},
          );
        }
        return Promise.reject(error);
      },
    );

    /**
     * Bind `getRequest` and `postRequest` methods to the class instance.
     */
    this.getRequest = this.getRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

  /**
   * Makes a GET request to the API.
   *
   * @param {string} endpoint - API endpoint URL.
   * @param {string} token - Optional authentication token.
   * @returns {Promise<any>} - Promise that resolves with the response data.
   * @example
   * const api = new Api();
   * api.getRequest('users/me').then(data => console.log(data));
   */
  async getRequest(endpoint, token) {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        headers: {'Content-Type': 'application/json'},
      });
      return response.data;
    } catch (error) {
      console.error(endpoint + ' Request failed', error);
      throw error;
    }
  }
  async deleteRequest(endPoint) {
    try {
      const response = await this.axiosInstance.delete(endPoint, {
        headers: {'Content-Type': 'application/json'},
      });
      return response.data;
    } catch (error) {
      console.error(endPoint + ' Request failed', error);
      throw error;
    }
  }

  /**
   * Makes a POST request to the API.
   *
   * @param {string} endpoint - API endpoint URL.
   * @param {object} data - Request body data.
   * @param {string} token - Optional authentication token.
   * @returns {Promise<any>} - Promise that resolves with the response data.
   * @example
   * const api = new Api();
   * api.postRequest('users', { name: 'John Doe', email: 'johndoe@example.com' }).then(data => console.log(data));
   */
  async postRequest(endpoint, data, token) {
    // console.log('this is endpoint', endpoint, data);
    try {
      const response = await this.axiosInstance.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxContentLength: Infinity,
      });
      return response.data;
    } 
    catch (error) {
      console.error(endpoint + ' Request failed', error);
      throw error;
    }
  }

  /**
   * Makes a login request to the API.
   *
   * @param {string} endpoint - API endpoint URL.
   * @param {object} data - Request body data.
   * @returns {Promise<any>} - Promise that resolves with the response data.
   * @example
   * const api = new Api();
   * api.login('login', { username: 'johndoe', password: 'password' }).then(response => console.log(response));
   */
  login = async (endpoint, data) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Constants.MainUrl}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    try {
      const response = await axios.post(config);
      return response;
    } catch (error) {
      console.error('Error during login request:', error);
      throw error;
    }
  };
}

export default new Api();
