import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetch } from "expo/fetch";
import { BASE_URL } from "./constants";
import { APIFetchArgs } from "./types";
import { getHeaders, handleResponse } from "./utils";

/**
 * Base API fetch function that handles authentication and response parsing.
 *
 * @param param0 - An object containing the following properties:
 *   - url: The endpoint for the request - string url.
 *   - init: Optional configuration for the fetch request.
 *   - responseType: The desired response type ('json', 'blob', or 'text') - default json.
 * @returns - A Promise that resolves to the parsed response data or rejects with an error.
 */
export const fetcher = async <T>({
  url,
  init,
  responseType = "json",
  withAuthentication = true,
}: APIFetchArgs): Promise<T> => {
  // here we use https and http to check external because all internal backend requests add the base url inside this function,
  // the implementation only requires the endpoint to be used as the url,
  // if the base url for our backend is used in the implementation of this function, the authentication headers will not be added to the request and the request should fail.
  const isExternalApi = url.includes("https") || url.includes("http");
  const endpoint = isExternalApi ? url : `${BASE_URL}${url}`;
  const headers = await getHeaders({ isExternalApi, withAuthentication, init });

  const fetchInit = {
    ...init,
    headers,
  };
  try {
    const url = new URL(endpoint).toString();
    const response = await fetch(url, fetchInit);

    if (response.status === 401) {
      await AsyncStorage.removeItem("session");
      await AsyncStorage.removeItem("user");
    }

    const result = handleResponse<T>(response, responseType);

    return result;
  } catch (error) {
    console.error({
      error: `Error fetching data: ${responseType}: ${url} Error: ${error}`,
    });
    throw error;
  }
};
