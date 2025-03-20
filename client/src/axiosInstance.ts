import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

let accessToken = "";

function setAccessToken(newToken: string) {
  accessToken = newToken;
  console.log("inside setacсesstoken:", accessToken);
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const prevReq = error.config;
    if (error.response.status === 403 && !prevReq.sent) {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_API
        }/token/refresh`,
        { withCredentials: true }
      );
      accessToken = response.data.accessToken;
      prevReq.sent = true;
      prevReq.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevReq);
    }
    return Promise.reject(error);
  }
);

export { setAccessToken };

export default axiosInstance;
