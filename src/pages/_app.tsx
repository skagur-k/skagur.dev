import "../styles/globals.css";
import type { AppProps } from "next/app";
import MaintenancePage from "./maintenance";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    console.log("🚧 Website Under Constructon 🚧");
    return <MaintenancePage />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
