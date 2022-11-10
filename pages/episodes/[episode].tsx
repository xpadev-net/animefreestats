import Head from "next/head";
import useSWR from "swr";
import {fetcher} from "../../libraries/fetcher";
import {useRouter} from "next/router";
import {site2name} from "../../libraries/site2name";
import {History} from "../../components/History";
import Link from "next/link";
import {episode2url} from "../../libraries/item2url";
import {isError} from "../../libraries/typeGuard";

const Episode = () => {
  const router = useRouter();

  const query = function(query){if (typeof query==="string") return encodeURI(query as string);return query?query[0]:""}(router.query.episode);
  const episode = useSWR<episode|error>(
    `//animeinfo.xpadev.net/api/v1/episode?query=${query}`,
    fetcher
  );
  const history = useSWR<history>(
    `//animeinfo.xpadev.net/api/v1/histories?query=${query}`,
    fetcher
  );
  if (episode.error||history.error) {
    return <div className={"container mx-auto text-center text-red-500"}>データの読み込みに失敗しました</div>;
  }
  if (!episode.data) {
    return <div className={"container mx-auto text-center text-gray-500"}>読み込んでいます...</div>;
  }
  if (isError(episode.data)){
    return <div className={"container mx-auto text-center text-red-500"}>該当する話が見つかりませんでした</div>;
  }
  const value = episode.data.data;
  const freeEndAt = value.freeEndAt===32503647600?"不明":new Date((value.freeEndAt||0) * 1000).toLocaleString(),
    addAt = new Date(value.addAt*1000),
    url = episode2url(value),
    site = site2name(value.site);
  return (
    <main className={"container mx-auto"}>
      <Head>
        <title>{`${value.episodeTitle} / ${value.title} (${site}) - AnimeFreeStats`}</title>
        <meta
          name="description"
          content="アニメの無料配信情報を一括で見れるサイトです"
        />
      </Head>
      <section className={"m-3 p-3 "}>
        <h1 className={"text-4xl"}>{value.episodeTitle}</h1>
        <p className={"text-2xl"}><Link href={`/animes/${value.anime}`}>{value.title} / {site}</Link></p>
        {value.isAvailable===1&&(value.site!==2||value.freeEndAt!==null)&&<p>配信ページ： <Link href={url} target={"_blank"} referrerPolicy={"no-referrer"}>{url}</Link></p>}
      </section>
      <section className={"m-3 p-3 "}>
        <h2 className={"text-3xl"}>メタ情報</h2>
        <p>配信状況: {value.isAvailable===0?"配信終了":value.freeEndAt===null?"無料配信なし":`無料配信中(期限：${freeEndAt})`}</p>
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
