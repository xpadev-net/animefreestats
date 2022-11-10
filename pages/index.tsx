import type { NextPage } from "next";
import Head from "next/head";

import useSWR from "swr";
import { fetcher } from "../libraries/fetcher";
import { useMemo } from "react";
import { EpisodeItem } from "../components/EpisodeItem";

const Home: NextPage = () => {
  const { data, error } = useSWR<searchEpisodes>(
    "//animeinfo.xpadev.net/api/v1/recent?limit=50",
    fetcher
  );
  const episodes = useMemo(() => {
    if (error) {
      return <div className={"text-red-500 text-center"}>データの読み込みに失敗しました</div>;
    }
    if (!data) {
      return <div className={"text-gray-500 text-center"}>読み込んでいます...</div>;
    }
    if (data.data.length === 0){
      return <div className={"text-gray-500 text-center"}>無料配信中のアニメは見つかりませんでした</div>;
    }
    return (
      <>
        {data.data.map((val, i) => {
          return <EpisodeItem key={i} value={val} />;
        })}
      </>
    );
  }, [data, error]);
  return (
    <main className={"container mx-auto"}>
      <Head>
        <title>AnimeFreeStats</title>
        <meta
          name="description"
          content="アニメの無料配信情報を一括で見れるサイトです"
        />
      </Head>
      <section className={"m-3 p-3 "}>
        <h1 className={"text-center text-3xl"}>まもなく無料配信が終了する話</h1>
        <div
          className={"flex flex-col lg:flex-row lg:flex-wrap justify-center"}
        >
          {episodes}
        </div>
      </section>
      <section className={"m-3 p-3"}>
        <h1 className={"text-center text-3xl"}>このサイトについて</h1>
        <p>登録不要で無料で見れる公式配信サイト(ABEMA, GYAO!, ニコニコ動画)のみを集めたサイトです</p>
        <p>
          無料配信中のアニメを探しているときによくヒットする「有料VODを初回無料期間中に解約すればタダで見れます！」というクソサイトを撲滅するために作成しました
        </p>
        <p>過去の無料配信履歴(一部)も確認することが出来ます</p>
      </section>
    </main>
  );
};

export default Home;
