import { http } from '@/libs/http';

/**
 * Makes an HTTP PUT request to the `/auth/refresh` endpoint with the provided `refreshToken`.
 *
 * @param {string} refreshToken - The refresh token to be sent in the request.
 * @return {Promise<any>} A Promise that resolves to the response data from the server.
 */
export const refreshTokenApi = async (refreshToken: string | null): Promise<any> => {
    return await http.put('/auth/refresh', { refreshToken });
};
