import { ReactElement, ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { NextPageWithLayout } from "~/types/next";
import { Toaster } from "sonner";

const getPageLayout = (
  Component: NextPageWithLayout,
  page: ReactElement,
): ReactNode => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(page);
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={GeistSans.className}>
        {getPageLayout(Component, <Component {...pageProps} />)}
        <Toaster position="bottom-center" richColors closeButton />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
