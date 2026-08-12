import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  is_superadmin: boolean;
  is_active: boolean;
}

export const login = async (
  data: LoginData
): Promise<LoginResponse> => {
  const formData = new URLSearchParams();

  formData.append("username", data.email);
  formData.append("password", data.password);

  const response = await api.post<LoginResponse>(
    "/users/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const response = await api.get<CurrentUser>("/users/me");

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveCurrentUser = (user: CurrentUser) => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );
};

export const getCurrentUserFromStorage = (): CurrentUser | null => {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as CurrentUser;
  } catch {
    localStorage.removeItem("currentUser");
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const isSuperAdmin = () => {
  const user = getCurrentUserFromStorage();

  return user?.is_superadmin === true;
};