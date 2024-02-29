const NODE_ENV = import.meta.env.VITE_NODE_ENV;

const DEV_PUBLIC_URL = import.meta.env.VITE_DEV_API_URL;
const PROD_PUBLIC_URL = import.meta.env.VITE_PROD_API_URL;
const GOOGLE_MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY

const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

const PUBLIC_URL = NODE_ENV === 'development' ? DEV_PUBLIC_URL : PROD_PUBLIC_URL;

export {
    PUBLIC_URL,
    SERVER_URL,
    GOOGLE_MAPS_API_KEY
};