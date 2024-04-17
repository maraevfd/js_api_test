import axios, { AxiosInstance, ResponseType } from "axios";
import { HeadersType, MethodType, PayloadType } from "../../types/request";

interface DefaultHeaders {
  [key: string]: string; // Allows any string key with a string value
}

class ApiServiceController {
  private baseUrl: string;
  private headers: DefaultHeaders;
  private timeout: number;
  private request: AxiosInstance;

  constructor(baseUrl: string, defaultHeaders: DefaultHeaders = null, timeout: number = 5000) {
    this.baseUrl = baseUrl;
    this.headers = defaultHeaders;
    this.timeout = timeout;
    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
      timeout: this.timeout,
    });
  }

  async sendRequest(path: string, method: MethodType = 'GET', payload: PayloadType | null = null, headers: HeadersType | null = null): Promise<any> {
    try {
      const response: ResponseType = await this.request[method.toLowerCase()](path, payload, headers);
      return response;
    } catch (error) {
      // console.error(error.message);
      throw error;
    }
  }
}

export { ApiServiceController };