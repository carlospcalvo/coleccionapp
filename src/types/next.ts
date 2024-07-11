import type { NextPage } from "next";
import { type Session } from "next-auth";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type CustomAppProps = AppProps & {
  session: Session | null;
};

export type AppPropsWithLayout = CustomAppProps & {
  Component: NextPageWithLayout;
};
