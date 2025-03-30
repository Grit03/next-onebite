import "@/styles/globals.css";
import GlobalLayout from "@/components/global-layout";
import type { AppProps } from "next/app";
import SearchableLayout from "@/components/searchable-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <SearchableLayout>
        <Component {...pageProps} />
      </SearchableLayout>
    </GlobalLayout>
  );
}
