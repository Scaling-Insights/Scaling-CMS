import axios from 'axios';
import { getCsrfTokenFromJwt, getJWTToken } from '@/services/AuthService'

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Setup a promise that will resolve when interceptors are ready
let interceptorsReadyPromiseResolve;

const interceptorsReadyPromise = new Promise(resolve => {
    interceptorsReadyPromiseResolve = resolve; // Will be called when interceptors are set
});

/**
 * @constant axiosInstance
 * @description Instance of axios, used for authenticated requests if JWT token is needed.
 */
const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000
});

/**
 * @function setHeaderToken
 * @param {Object} config The config of the axios instance.
 * @param {string} token The token value for the Authorization header.
 * @description Setting the header token, used by axios interceptors only!
 * The Axios instance itself doesn't have a config property.
 */
export const setHeaderToken = (config: any, token: string) => {
    config.headers['Authorization'] = `Bearer ${token}`;
}

/**
 * @function removeHeaderToken
 * @param {Object} config The config of the axios instance.
 * @description Removing the header token, used by axios interceptors.
 */
export const removeHeaderToken = (config: any) => {
    delete config.headers['Authorization'];
}

/**
 * @function setAxiosInterceptors
 * @description Setting the axios interceptors for authenticated routes. However the login and register will not use the 
 * refresh token functionality because of notification of getting 401 errors.
 */
export const setAxiosInterceptors = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            return interceptorsReadyPromise.then(() => {
                const accessToken = getJWTToken();
                if (accessToken) {
                    setHeaderToken(config, accessToken);

                    // Access the HTTP method (e.g., POST, PUT)
                    const method = config.method.toUpperCase(); // Method is usually in lowercase, so convert to uppercase

                    // You can add custom logic based on the method
                    if (method === 'POST' || method === 'PUT') {
                        const csrfToken = getCsrfTokenFromJwt(accessToken);
                        config.headers['CSRF-Token'] = csrfToken;
                    }

                }
                return config;
            });
        },
        (error) => {
            //console.log(error)
            return Promise.reject(error);
        }
    );

    // createAuthRefreshInterceptor(axiosInstance, refreshAuth, {
    //     statusCodes: [401], // default: [ 401 ]
    //     pauseInstanceWhileRefreshing: true,
    //     shouldRefresh: (error) => {
    //         // Inspect the endpoint to determine if it should be skipped
    //         const requestUrl = error.config.url;

    //         // List of endpoints to skip refreshing
    //         const excludedEndpoints = ['auth/login', 'auth/register'];

    //         // Skip refresh logic for any of the excluded endpoints
    //         if (excludedEndpoints.some(endpoint => requestUrl.includes(endpoint))) {
    //             return false;
    //         }

    //         // Apply refresh logic for all other endpoints
    //         return false;
    //     },
    // });

    // Resolve the promise to signal that interceptors are set up
    interceptorsReadyPromiseResolve();
};

export default axiosInstance;