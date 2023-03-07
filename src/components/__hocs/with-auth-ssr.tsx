import { getSession } from "next-auth/react";
import { API } from "../../configs/api";

export const withAuthSSR = (getSsrProps?: Function) => {
  return async (context: any) => {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/sign-in",
        },
        props: {},
      };
    } else {
      const user = await new API((session.accessToken as string) || null)
        .get("auth/check")
        .fetch()
      const {data} = user  
      if (!data) {
        context.res.writeHead(302, {
          // or 301
          Location: "/auth/sign-in",
        });
        context.res.end();
      }
      if (getSsrProps) {
        return {
          props: {
            user: session.user,
            data: await getSsrProps(context, session.user),
          },
        };
      }
    }
    return { props: {} };
  };
};
