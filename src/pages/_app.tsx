import { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/sections/Layout";
import MaintenancePage from "./maintenance";

import type { AppProps } from "next/app";
import "@/styles/globals.css";

type AppPropsWithNextPage = AppProps & {
  Component: NextPage;
};

export default function MyApp({ Component, pageProps }: AppPropsWithNextPage) {
  // Shows maintenance page if the env var NEXT_PUBLIC_MAINTENANCE is set to true.
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    console.log("🚧 Website Under Constructon 🚧");
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
