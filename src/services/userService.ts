import { API_SERVER } from '../config/api';

export interface User {
    _id: string;
    email: string;
    name: string;
    access: 'admin' | 'doctor' | 'user';
    createAt?: string;
    updateAt?: string;
}

export interface CreateUserParams {
    email: string;
    password: string;
    name: string;
    access: 'doctor' | 'user';
}

export interface UpdateUserParams {
    email: string;
    password?: string;
    name: string;
    access: 'doctor' | 'user';
}

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_SERVER}/user/get-all-user`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

// Add new user
export const addUser = async (data: CreateUserParams): Promise<any> => {
    const response = await fetch(`${API_SERVER}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to add user');
    }
    return response.json();
};

// Update user
export const updateUser = async (data: UpdateUserParams): Promise<any> => {
    const response = await fetch(`${API_SERVER}/user/update-user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
};

// Delete user
export const deleteUser = async (id: string): Promise<any> => {
    const response = await fetch(`${API_SERVER}/user/delete-user/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return response.json();
};

export default {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
};
