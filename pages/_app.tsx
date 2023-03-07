require("typeface-roboto");
import { Toast, ToastProps } from "@components/toast";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiProvider } from "src/providers/api-provider";
import { GeneralProvider } from "src/providers/general-provider";
import "../src/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: any) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const [alert, showAlert] = useState({
    open: false,
    message: "asyyy",
    severity: "success" as ToastProps["severity"],
  });

  const onToastClose = () => {
    showAlert({...alert, open: false});
  }

  const page = getLayout(<Component {...pageProps} showAlert={showAlert} />);
  const queryClient = new QueryClient();
  return (
    <>
      <NextNProgress />
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ApiProvider showAlert={showAlert}>
            <GeneralProvider>{page}</GeneralProvider>
          </ApiProvider>
        </QueryClientProvider>
      </SessionProvider>
      <Toast
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={onToastClose}
      />
    </>
  );
}
