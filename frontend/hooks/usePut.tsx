import axios from "axios";
import { useRef } from "react";
import { setJWTToken } from "@/services/AuthService";
import axiosInstance, { setAxiosInterceptors } from "../services/AxiosService";


setAxiosInterceptors()
/**
 * Custom hook for sending PUI requests to the server.
 * Returns the response and the data.
 */
export const usePut = () => {
	// State variables
	const responseRef = useRef<number>(0);
	const dataRef = useRef<any[]>([]);
	const errorRef = useRef<string | null>(null);

	/**
	 * Function to send a PUT request to the server.
	 * @param {string} endpoint - The path to send the request to.
	 * @param {FormData} body - The body of the request.
	 * @param {string} token - The token to authenticate the request if needed.
	 * @returns {Promise<{ response: number, data: any[] }>} The response and the data.
	 */
	const putData = async (endpoint: string, body: any, externalCommunication: boolean) => {
		setAxiosInterceptors();
		let currentAxiosInstance = axiosInstance;

		if (externalCommunication) {
			currentAxiosInstance = axios.create({ ...axiosInstance.defaults });
			delete currentAxiosInstance.defaults.headers.common['Authorization'];
		}

		try {
			const response = await currentAxiosInstance.put(endpoint, body);
			responseRef.current = response.status;
			if (response.status == 200) {
				if (response.data.accessToken !== undefined && response.data.accessToken !== null)
					setJWTToken(response.data.accessToken);

				dataRef.current = response.data;
			} else {
				//toast.error(errorRef.current as string);
			}
		} catch (error) {
			// Save the error in the error ref
			console.error("Error occurred while fetching data:", error);
			errorRef.current = error as string;
		}

		return { response: responseRef.current, data: dataRef.current };
	};

	return { putData };
};
