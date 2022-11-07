import Head from "next/head";
import useSWR from "swr";
import {fetcher} from "../../libraries/fetcher";
import {useRouter} from "next/router";
import {site2name} from "../../libraries/site2name";
import {History} from "../../components/History";

const Episode = () => {
  const router = useRouter();

  const query = function(query){if (typeof query==="string") return encodeURI(query as string);return query?query[0]:""}(router.query.episode);
  const episode = useSWR<episode>(
    `//animeinfo.xpadev.net/api/v1/episode?query=${query}`,
    fetcher
  );
  const history = useSWR<history>(
    `//animeinfo.xpadev.net/api/v1/histories?query=${query}`,
    fetcher
  );
  if (episode.error||history.error) {
    return <div className={"text-red-500"}>failed to load resources</div>;
  }
  if (!episode.data) {
    return <div className={"text-gray-500"}>loading...</div>;
  }
  const value = episode.data.data;
  const freeEndAt = new Date((value.freeEndAt||0) * 1000),
    addAt = new Date(value.addAt*1000);
  return (
    <main className={"container mx-auto"}>
      <Head>
        <title>{`AnimeFreeStats`}</title>
        <meta
          name="description"
          content="アニメの無料配信情報を一括で見れるサイトです"
        />
      </Head>
      <section className={"m-3 p-3 "}>
        <h1 className={"text-4xl"}>{value.episodeTitle}</h1>
        <span className={"text-2xl"}>{value.title} / {site2name(value.site)}</span>
      </section>
      <section className={"m-3 p-3 "}>
        <h2 className={"text-3xl"}>メタ情報</h2>
        <p>配信状況: {value.isAvailable===0?"配信終了":value.freeEndAt===null?"無料配信なし":`無料配信中(期限：${freeEndAt.toLocaleString()})`}</p>
        <p>配信開始: {value.addAt<0?"不明":`${addAt.toLocaleString()}`}</p>
        <p className={"text-gray-400 text-sm"}>※配信開始=システムが認識したタイミング≠実際の配信開始</p>
        <p>DRM: {value.isDRM?"有効":"無効"}</p>
        <p>レンタル: {value.isRental?"はい":"いいえ"}</p>
      </section>
      <section className={"m-3 p-3 "}>
        <History value={history}/>
      </section>
    </main>
  );
};
export default Episode;
