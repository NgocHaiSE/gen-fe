import { useMemo } from 'react';
import { getUserInfo } from './token';

export type UserRole = 'admin' | 'doctor' | 'user';

export interface AuthInfo {
    isAuthenticated: boolean;
    user: API.UserInfo | null;
    role: UserRole;
    isAdmin: boolean;
    isDoctor: boolean;
    isUser: boolean;
    canEdit: boolean;      // Có thể thêm/sửa/xóa
    canManageUsers: boolean; // Có thể quản lý người dùng
}

/**
 * Get current user's auth info
 * This is a utility function, not a hook
 */
export function getAuthInfo(): AuthInfo {
    const user = getUserInfo();
    const role = (user?.access as UserRole) || 'user';

    const isAdmin = role === 'admin';
    const isDoctor = role === 'doctor';
    const isUser = role === 'user';

    return {
        isAuthenticated: !!user,
        user,
        role,
        isAdmin,
        isDoctor,
        isUser,
        canEdit: isAdmin || isDoctor, // Admin và Doctor có thể chỉnh sửa
        canManageUsers: isAdmin,       // Chỉ Admin có thể quản lý users
    };
}

/**
 * Hook to get auth info with reactivity
 */
export function useAuth(): AuthInfo {
    const authInfo = useMemo(() => getAuthInfo(), []);
    return authInfo;
}

/**
 * Check if current user has permission to perform an action
 */
export function hasPermission(permission: 'edit' | 'delete' | 'create' | 'manageUsers'): boolean {
    const auth = getAuthInfo();

    switch (permission) {
        case 'edit':
        case 'delete':
        case 'create':
            return auth.canEdit;
        case 'manageUsers':
            return auth.canManageUsers;
        default:
            return false;
    }
}

/**
 * Check if menu item should be visible for current user
 */
export function canAccessMenuItem(menuItem: { access?: string }): boolean {
    const auth = getAuthInfo();

    // Nếu không có access restriction, cho phép tất cả
    if (!menuItem.access) {
        return true;
    }

    // Kiểm tra access
    switch (menuItem.access) {
        case 'canAdmin':
            return auth.isAdmin;
        case 'canDoctor':
            return auth.isAdmin || auth.isDoctor;
        default:
            return true;
    }
}
