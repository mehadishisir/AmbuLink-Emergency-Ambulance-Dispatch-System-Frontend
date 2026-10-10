import { ofetch } from "ofetch";
import { useAuthStore } from "@/stores/auth-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  onRequest({ options }) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      options.headers = new Headers(options.headers);
      options.headers.set("Authorization", `Bearer ${token}`);
    }
  },
  onResponseError({ response }) {
    const message = response._data?.message;
    throw new Error(message || "Request failed. Please try again");
  },
});

export default apiClient;