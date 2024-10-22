import { expo } from '@/app.json';
import env from '@/utils/env';

const environment = process.env?.EXPO_PUBLIC_APP_ENV

export const APP_NAME = expo.name;
export const APP_SLUG = expo.slug;

const endpoints = {
    // development: 'https://wren-backend-dev.azurewebsites.net/api/v1/',
    // production: 'https://wren-backend.azurewebsites.net/api/v1/',
    // demo: 'https://wren-backend-demo.azurewebsites.net/api/v1/',
    
    development: 'https://pandadan.ngrok.io/api/v1',
  };
  
  export const DEFAULT_API_CONFIG = {
    // if environment is not dev, make sure the endpoint is built properly (either for staging or for prod)
    // if it is dev, manually specify the endpoint for debugging
    url: !env?.isDev ? endpoints[environment] : endpoints.development,
  
    timeout: 3000,
  };

export const TOKEN_STORAGE_KEY = `${APP_SLUG}-auth-token`;
export const CSRF_TOKEN_STORAGE_KEY = `${APP_SLUG}-csrf-token`;
