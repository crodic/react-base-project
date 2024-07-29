import axios from 'axios';
import { useSession } from '@/hooks/useSession';
import { refreshTokenApi } from '@/apis/auth';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10 * 60 * 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

request.interceptors.request.use(
    (config) => {
        const accessToken = useSession.getState().accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let refreshTokenPromise: Promise<any> | null = null;

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        //* Token hết hạn trả về 401 => Ko truyền token => Ko cần refresh => Logout
        if (error.response.status === 401) {
            // Do somethings
        }
        const originalRequest = error.config;

        if (error.response.status === 410 && originalRequest) {
            if (!refreshTokenPromise) {
                const refreshToken = useSession.getState().refreshToken;

                refreshTokenPromise = refreshTokenApi(refreshToken)
                    .then((res: any) => {
                        const accessToken = res.data.accessToken;
                        useSession.setState({ accessToken });
                        //? Gán token lại vào headers
                        request.defaults.headers.Authorization = `Bearer ${accessToken}`;
                    })
                    .catch((_error: any) => {
                        //! Mọi lỗi trả về đều logout
                        return Promise.reject(_error);
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }

            await refreshTokenPromise;
            return await request(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const http = {
    get: <T>(url: string) => request.get<T>(url),
    post: <T>(url: string, data: any) => request.post<T>(url, data),
    put: <T>(url: string, data: any) => request.put<T>(url, data),
    delete: <T>(url: string) => request.delete<T>(url),
};
