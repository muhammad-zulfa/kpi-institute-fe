/* eslint-disable react/display-name */
import Layouts from "@components/layouts";
import { Fragment } from "react";

type NextLayouts = {
  withHeader?: boolean,
  withFooter?: boolean,
  withSidebar?: boolean,
}

// export type NextPageWithLayout
export type NextPageWithLayout = {
  (d?: any): JSX.Element;
}

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout,
// }

export default function withLayouts(page: any, layouts: NextLayouts) {
  const { withFooter, withHeader, withSidebar } = layouts;

  return (
    <Fragment>
        <Layouts withHeader={withHeader || false} withFooter={withFooter || false} withSidebar={withSidebar || false}>{page}</Layouts>
    </Fragment>
  )
};
