import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={"flex flex-col h-full"}>
      <Head>
        <title>AnimeFreeStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={"flex-1"}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
