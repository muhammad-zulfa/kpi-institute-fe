import { API } from "@configs/api";
import { useSession } from "next-auth/react";
import React, { createContext, ReactNode } from "react";

export interface ApiProviderProps {
  get: (url: string, data?: any) => Promise<any>;
  post: (url: string, data: any, multipart?: boolean, noAlert?: boolean) => Promise<any>;
  put: (url: string, data: any) => Promise<any>;
  del: (url: string, data?: any) => Promise<any>;
  loading: boolean;
  ready: boolean;
}

export const ApiContext = createContext<ApiProviderProps>({} as ApiProviderProps);

interface Props {
  children?: ReactNode;
  showAlert: ({}: any) => void;
}
export const ApiProvider: React.FC<Props> = ({ children, showAlert }) => {
  const session = useSession();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [ready, setReady] = React.useState<boolean>(false);
  const [api, setApi] = React.useState<API>(new API());

  const showError = (error: any) => {
    if (error?.response?.data?.message) {
      showAlert({
        open: true,
        severity: "error",
        message: error.response.data.message,
      });
    } else {
      showAlert({
        open: true,
        severity: "error",
        message: "Something went wrong",
      });
    }
  };

  const showSuccess = (message: string) => {
    showAlert({
      open: true,
      severity: "success",
      message: message,
    });
  }

  React.useEffect(() => {
    if (session.data) {
      setApi(new API(session.data?.accessToken as string));
      setReady(true);
    }else{
      setReady(false);
    }
  }, [session.data]);

  const post = async (url: string, data: any, multipart = false, noAlert = false) => {
    setLoading(true);
    const { data: response, error } = await api.post(url).payload(data).fetch(multipart);
    setLoading(false);

    if (!noAlert) {
      if (error) {
        showError(error);
      } else {
        showSuccess("Data has been saved");
      }
    }
    return response;
  };

  const get = async (url: string, data?: any) => {
    setLoading(true);
    const {data: response, error} = await api
      .get(url)
      .payload(data || {})
      .fetch();
    setLoading(false);

    if (error) {
      showError(error);
    }

    return response;
  };

  const put = async (url: string, data: any) => {
    setLoading(true);
    const {data: response, error} = await api.put(url).payload(data).fetch();
    setLoading(false);

    if(error){
      showError(error)
    }else{
      showSuccess("Data has been updated")
    }

    return response;
  };

  const del = async (url: string, data?: any) => {
    setLoading(true);
    const {data: response, error} = await api
      .delete(url)
      .payload(data || {})
      .fetch();
    setLoading(false);

    if (error) {
      showError(error);
    }else{
      showSuccess("Data has been deleted")
    } 

    return response;
  };

  return (
    <ApiContext.Provider value={{ get, put, del, post, loading, ready }}>
      {children}
    </ApiContext.Provider>
  );
};