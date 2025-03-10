import { TOKEN_KEY } from '@/shared/constants';
import type {
  Axios,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

const parameters = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
};

const middleware = (instance: Axios): Axios => {
  instance.interceptors.request.use(onRequestSuccess, onRequestError);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);
  return instance;
};

const onRequestSuccess = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  console.info('Axios interceptor : request configuration', config);
  const token = Cookies.get(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  console.info('Axios interceptor : response successfull', response);
  return response;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  console.error('Axios interceptor : request faillure', error);

  if (error.response?.status === 401) {
    Cookies.remove(TOKEN_KEY);
    window.location.href = '/';
  }
  throw error;
};

const onResponseError = (error: AxiosError): AxiosError => {
  console.error('Axios interceptor : response faillure', error);
  throw error;
};

const apiFactory = () => ({
  tiptop: middleware(
    axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      ...parameters,
    })
  ),
});

const apis = apiFactory();

export { apis };
