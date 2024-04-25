const API_URL = "http://localhost:8000/api";
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/user/register/`,
  SIGN_IN: `${API_URL}/user/login/`,
  GET_USER: `${API_URL}/auth/me/`,
};

export const APP_ROUTES = {
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  DASHBOARD: "/dashboard",
};
