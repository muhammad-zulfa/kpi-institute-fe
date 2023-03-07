import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from "axios";
import  {RequestInternal} from 'next-auth'
/**
 * API class to fetch data
 * @param {string} url
 **/
export class API {
  private instance: AxiosInstance;
  private url: string = "";
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "https://api-dinkes.jakarta.go.id/jaksehat/";
  private token: string | null = null;
  private clientKey = "";
  private data: any = null;
  private method: Method = "get";

  /**
   * construct to build axios
   * @param {string | null} token
   * @param {string | undefined} baseUrl
   */
  constructor(token: string | null = null, baseUrl?: string) {
    const authHeader: any = {};
    this.instance = axios.create({
      baseURL: baseUrl || this.baseUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (token) {
      this.token = token;
      authHeader["Authorization"] = `Bearer ${token}`;
      this.instance.interceptors.request.use(function (config) {
        config.headers = {
          ...config.headers,
          ...authHeader,
        };
        return config;
      });
    }

    this.instance.interceptors.response.use((res) => {
      const headers = res.headers || null;
      if (headers && headers["Authorization"]) {
        // save new token
      }
      return res;
    }, this.handleError);
  }

  /**
   * 描述
   * @date 2022-04-08
   * @param {any} body
   * @param {any} headers
   * @param {any} method
   * @param {any} query
   * @return {any}
   */
  static bindRequestSpec = ({
    body,
    headers,
    method,
    query,
  }: Pick<RequestInternal, "body" | "headers" | "method" | "query">) => {
    return new API().initBindRequestSpec({
      headers,
      params: query,
      method,
      data: body,
    });
  };

  /**
   * 描述
   * @date 2022-04-08
   * @param {any} spec:any
   * @return {API}
   */
  private initBindRequestSpec = (spec: any) => {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      ...spec,
    });

    return this;
  };

  /**
   * @param {string} url
   * @return {API} this class
   **/
  get = (url: string): API => {
    this.method = "get";
    this.url = url;
    return this;
  };

  /**
   * @param {string} url
   * @return {API} this class
   **/
  post = (url: string): API => {
    this.method = "post";
    this.url = url;
    return this;
  };

  /**
   * @param {string} url
   * @return {API} this class
   **/
  patch = (url: string): API => {
    this.method = "patch";
    this.url = url;
    return this;
  };

  /**
   * @param {string} url
   * @return {API} this class
   **/
  delete = (url: string): API => {
    this.method = "delete";
    this.url = url;
    return this;
  };

  /**
   * @param {string} url
   * @return {API} this class
   **/
  put = (url: string): API => {
    this.method = "put";
    this.url = url;
    return this;
  };

  /**
   * 描述
   * @date 2022-04-07
   * @param {AxiosError} error
   * @return {any}
   */
  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // window.location.href = "/auth/sign-in";
      }
    }
    
    return Promise.reject(error.response || error.message);
  };

  /**
   * 描述
   * @date 2022-04-07
   * @return {any}
   */
  private async refreshToken(): Promise<{
    data: { data: { token: string } };
    status: number;
  }> {
    const refreshTokenRequest = {
      token: this.token,
    };

    // const { data } = await this.addRequestOptionsForClientSecrect();

    const options: AxiosRequestConfig = {
      // headers: {
      //   CLIENT_KEY: data.clientKey,
      // },
    };

    return this.instance.post(
      `${this.baseUrl}/v1/admin/check-login`,
      refreshTokenRequest,
      options
    );
  }

  /**
   * 描述
   * @date 2022-04-07
   * @return {any}
   */
  private addRequestOptionsForClientSecrect = () => {
    return {
      data: {
        clientKey: this.clientKey,
      },
    };
  };

  /**
   * 描述
   * @date 2022-04-07
   * @param {any} payload:any
   * @return {API}
   */
  payload = (payload: any): API => {
    this.data = payload;
    return this;
  };

  /**
   * 描述
   * @date 2022-04-07
   * @param {string} url
   * @return {any}
   */
  fetch = async (multipart?: boolean): Promise<any> => {
    let data
    let error
    const config: any = { url: this.url, method: this.method };
    if (this.data) {
      config.data = this.data;
    }
    if (this.method === "get" && this.data) {
      config.params = this.data;
    }
    if (multipart) {
      config.headers = {
        ...this.instance.defaults.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    

    await this.instance(config)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => error = err.data || {message: "Unknown error"});

    return {data, error}
  };
}
