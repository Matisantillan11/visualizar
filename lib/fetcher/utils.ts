import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchResponseTypes } from './types';

export async function getHeaders({
  isExternalApi,
  withAuthentication,
  init,
}: {
  isExternalApi: boolean;
  withAuthentication: boolean;
  init?: RequestInit | undefined;
}) {
  const authorization = !isExternalApi && withAuthentication ? await _getAuthorizationHeader() : {};

  const headers = {
    ...init?.headers,
    ...(isExternalApi ? {} : { ...authorization }),
  };

  return headers;
}

export function isObject(data: unknown): data is object {
  return typeof data === 'object' && data !== null;
}

// Helper function to parse response based on the responseType
export async function handleResponse<T>(
  response: Response,
  responseType: FetchResponseTypes
): Promise<T> {
  if (response.ok) {
    const responseData = await response.json();
    if (!isObject(responseData)) {
      _throwTypeError(responseType);
    }

    return responseData as T;
  } else {
    throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
  }
}

/***** NOTE:: The underscore for the following util functions implies they are "private", not exported. *****/

async function _getAuthorizationHeader() {
  try {
    const storedSession = await AsyncStorage.getItem('session');
    const session = JSON.parse(storedSession as string);
    const token = session?.token;

    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error({ error: `Failed to retrieve token: ${error}` });
    throw new Error('Authentication failed');
  }
}

function _throwTypeError(responseType: FetchResponseTypes): never {
  throw new Error(`Invalid response type for ${responseType}`);
}
