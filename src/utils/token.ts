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

const USER_INFO_KEY = "userInfo";

/**
 * Save user info to sessionStorage
 * @param userInfo - User info object from backend
 */
export const saveUserInfo = (userInfo: API.UserInfo) => {
    sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

/**
 * Get user info from sessionStorage
 */
export const getUserInfo = (): API.UserInfo | null => {
    const data = sessionStorage.getItem(USER_INFO_KEY);
    if (data) {
        try {
            return JSON.parse(data) as API.UserInfo;
        } catch {
            return null;
        }
    }
    return null;
};

/**
 * Remove user info from sessionStorage
 */
export const removeUserInfo = () => {
    sessionStorage.removeItem(USER_INFO_KEY);
};

export default {
    setToken,
    save,
    get,
    removeToken,
    isAuthenticated,
    getTokenObject,
    saveUserInfo,
    getUserInfo,
    removeUserInfo,
};
