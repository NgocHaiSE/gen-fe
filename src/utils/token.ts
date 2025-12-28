const TOKEN_KEY = "accessToken";

/**
 * Save token to localStorage/sessionStorage
 * @param token - Token to save
 */
export const setToken = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

/**
 * Save token (alias)
 */
export const save = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get token
 */
export const get = (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token
 */
export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!get();
};

/**
 * Get token object
 */
export const getTokenObject = () => {
    const accessToken = get();
    const refreshToken = sessionStorage.getItem('refreshToken');
    return {
        accessToken,
        refreshToken
    };
};

export default {
    setToken,
    save,
    get,
    removeToken,
    isAuthenticated,
    getTokenObject,
};
