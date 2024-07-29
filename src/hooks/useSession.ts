import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SessionState {
    isLoggedIn: boolean;
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

interface SessionActions {
    login: (accessToken: string, refreshToken: string, userId: string) => void;
    logout: () => void;
}

export const useSession = create<SessionState & SessionActions>()(
    persist(
        immer((set) => ({
            isLoggedIn: false,
            userId: null,
            accessToken: null,
            refreshToken: null,
            /**
             * Updates the session state with the provided access token and refresh token.
             *
             * @param {string} accessToken - The access token.
             * @param {string} refreshToken - The refresh token.
             * @return {void}
             */
            login: (accessToken: string, refreshToken: string, userId: string): void =>
                set((state) => {
                    state.isLoggedIn = true;
                    state.userId = userId;
                    state.accessToken = accessToken;
                    state.refreshToken = refreshToken;
                }),
            /**
             * Logs out the user by resetting the session state.
             *
             * @return {void}
             */
            logout: (): void =>
                set((state) => {
                    state.isLoggedIn = false;
                    state.accessToken = null;
                    state.refreshToken = null;
                }),
        })),
        { name: 'react-auth', storage: createJSONStorage(() => localStorage) }
    )
);
