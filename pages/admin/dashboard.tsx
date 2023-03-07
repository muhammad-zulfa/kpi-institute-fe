import { IHistory } from "@components/breadcrumb";
import { withAuth } from "@components/__hocs/with-auth";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/with-layouts";
import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { GeneralContext } from "src/providers/general-provider";

const Dashboard = withAuth(() => {
  const { setHistories } = useContext(GeneralContext);

  useEffect(() => {
    setHistories([]);
  }, [])

  return <></>;
}, ["admin", "provider"])

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

Dashboard.getLayout = (page: any) =>
  withLayouts(page, { withFooter: true, withHeader: true, withSidebar: true });

export default Dashboard