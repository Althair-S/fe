import axios from "axios";
import environment from "@/config/environment";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface CustomSession extends Session {
    accessToken: string;
}

const headers = {
    "Content-Type": "application/json",
}

const instance = axios.create({
    baseURL: environment.API_URL,
    timeout: 60 * 1000,
    headers,
});

instance.interceptors.request.use(
  async (request) => {
    const session = await getSession() as CustomSession;
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
