import { useRef } from "react";
import { setJWTToken } from "@/services/AuthService";
import axiosInstance, { setAxiosInterceptors } from "../services/AxiosService";


setAxiosInterceptors();

/**
 * Custom hook for sending GET requests to the server.
 * Returns the response and the data.
 */
export const useGet = () => {
	// Ref variables
	const responseRef = useRef<number>(0);
	const dataRef = useRef<any[]>([]);
	const errorRef = useRef<string | null>(null);

	/**
	 * Function to send a GET request to the server.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @returns {Promise<{ response: number, data: any[] }>} The response and the data.
	 */
	const getData = async (endpoint: string) => {
		try {
			const response = await axiosInstance.get(endpoint);
			responseRef.current = response.status;

			if (response.status != 200) {
				console.error("Error occurred while fetching data:", response);
				errorRef.current = response.status + " " + response.statusText;
			}

			if (response.data.accessToken !== undefined && response.data.accessToken !== null) {
				setJWTToken(response.data.accessToken);
			}

			dataRef.current = response.data;
		}
		catch (error) {
			//console.log(error)
			console.error("Error occurred while fetching data:", error);
			errorRef.current = error as string;
		}

		return { response: responseRef.current, data: dataRef.current, error: errorRef.current };
	};

	return { getData };
};
