import "@/styles/globals.css";
import GlobalLayout from "@/components/global-layout";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

// 기본적인 컴포넌트에는 getLayout함수가 없으므로, 타입에 추가해야한다.
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // 컴포넌트에 getLayout 함수가 있다면 사용하고, 없으면 그대로 page를 리턴
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
