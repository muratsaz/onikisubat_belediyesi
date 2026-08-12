import api from "./api";

export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  is_superadmin: boolean;
  is_active: boolean;
}

export interface UserCreateData {
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export interface UserUpdateData {
  username?: string;
  email?: string;
  is_admin?: boolean;
  is_superadmin?: boolean;
  is_active?: boolean;
}

export interface UserPasswordChangeData {
  current_password: string;
  new_password: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users/admin");
  return response.data;
};

export const getUserById = async (
  userId: number
): Promise<User> => {
  const response = await api.get<User>(
    `/users/admin/${userId}`
  );

  return response.data;
};

export const createUser = async (
  data: UserCreateData
): Promise<User> => {
  const response = await api.post<User>(
    "/users/admin",
    data
  );

  return response.data;
};

export const updateUser = async (
  userId: number,
  data: UserUpdateData
): Promise<User> => {
  const response = await api.put<User>(
    `/users/admin/${userId}`,
    data
  );

  return response.data;
};

export const deleteUser = async (
  userId: number
) => {
  const response = await api.delete(
    `/users/admin/${userId}`
  );

  return response.data;
};

// =====================================================
// CURRENT USER
// =====================================================

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>(
    "/users/me"
  );

  return response.data;
};

// =====================================================
// CHANGE OWN PASSWORD
// =====================================================

export const changeOwnPassword = async (
  data: UserPasswordChangeData
) => {
  const response = await api.put(
    "/users/me/password",
    data
  );

  return response.data;
};