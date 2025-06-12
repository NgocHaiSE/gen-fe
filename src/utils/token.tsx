const TOKEN_KEY = "accessToken";

/**
 * Lưu token vào localStorage
 * @param token - Token cần lưu
 */
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Lấy token từ localStorage
 * @returns Token hoặc null nếu không tồn tại
 */
export const get = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Xóa token khỏi localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Kiểm tra xem token có tồn tại hay không
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
  return !!get();
};

export default {
  setToken,
  get,
  removeToken,
  isAuthenticated,
};
