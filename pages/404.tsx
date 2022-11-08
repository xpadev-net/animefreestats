import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <main className={"container mx-auto h-full flex justify-center items-center"}>
      <Head>
        <title>AnimeFreeStats</title>
        <meta
          name="description"
          content="アニメの無料配信情報を一括で見れるサイトです"
        />
      </Head>
      <div className={"flex"}>
        <h1 className={"text-2xl font-sans px-5 py-3"}>404</h1>
        <div className={"border-l-2 border-black pl-5 py-4"}>
          <span>This page could not be found.</span>
        </div>
      </div>
    </main>
  );
};

export default Home;
