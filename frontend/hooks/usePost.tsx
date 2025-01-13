import { useRef } from "react";
import { setJWTToken } from "@/services/AuthService";
import axiosInstance, { setAxiosInterceptors, removeHeaderToken } from "@/services/AxiosService";
import axios from "axios";


/**
 * Custom hook for sending POST requests to the server.
 * Returns the response and the data.
 */
export const usePost = () => {
	// Ref variables
	const responseRef = useRef<number>(0);
	const dataRef = useRef<any[]>([]);
	const errorRef = useRef<string | null>(null);

	/**
	 * Function to send a POST request to the server.
	 * @param {string} endpoint - The path to send the request to.
	 * @param {FormData} body - The body of the request.
	 * @param {boolean} externalCommunication - If the request is to an external server.
	 * @returns {Promise<{ response: number, data: any[] }>} The response and the data.
	 */
	const postData = async (endpoint: string, body: any, externalCommunication: boolean) => {
		setAxiosInterceptors();
		let currentAxiosInstance = axiosInstance;

		if (externalCommunication) {
			currentAxiosInstance = axios.create({ ...axiosInstance.defaults });
			delete currentAxiosInstance.defaults.headers.common['Authorization'];
		}

		try {
			const response = await currentAxiosInstance.post(endpoint, body);
			responseRef.current = response.status;

			if (response.status != 200 && response.status != 201) {
				console.error("Error occurred while fetching data:", response);
				errorRef.current = response.status + " " + response.statusText;
			}

			if (response.data.accessToken !== undefined && response.data.accessToken !== null) {
				setJWTToken(response.data.accessToken);
			}
			dataRef.current = response.data;
		} catch (error: any) {
			console.error('Error occurred while posting data:', error);
			if (error.response) {
				// Server response with an error status
				throw new Error(error.response.data?.message || 'An error occurred while posting data.');
			} else if (error.request) {
				// Request was sent, but no response received
				throw new Error('No response received from the server.');
			} else {
				throw new Error(error.message);
			}
		}

		return { response: responseRef.current, data: dataRef.current, error: errorRef.current };
	};

	return { postData };
};
