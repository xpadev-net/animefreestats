import Head from "next/head";
import useSWR from "swr";
import {fetcher} from "../../libraries/fetcher";
import {useMemo} from "react";
import {EpisodeItem} from "../../components/EpisodeItem";
import {useRouter} from "next/router";
import Link from "next/link";
import {anime2url} from "../../libraries/item2url";
import {isError} from "../../libraries/typeGuard";

const Anime = () => {
  const router = useRouter();

  const query = function(query){if (typeof query==="string") return encodeURI(query as string);return query?query[0]:""}(router.query.anime);
  const animes = useSWR<anime|error>(
    `//animeinfo.xpadev.net/api/v1/anime?query=${query}`,
    fetcher
  );
  const episodesComponent = useMemo(() => {
    if (animes.error||!animes.data||isError(animes.data)) {
      return <></>;
    }
    if (animes.data.data.episodes.length === 0){
      return <div className={"text-gray-500 text-center"}>無料配信中の話は見つかりませんでした</div>;
    }
    return (
      <>
        {animes.data.data.episodes.map((val, i) => {
          return <EpisodeItem key={i} value={val} />;
        })}
      </>
    );
  }, [animes]);
  if (animes.error) {
    return <div className={"text-red-500"}>データの読み込みに失敗しました</div>;
  }
  if (!animes.data) {
    return <div className={"text-gray-500"}>読み込んでいます...</div>;
  }
  if (isError(animes.data)){
    return <div className={"container mx-auto text-center text-red-500"}>該当するタイトルが見つかりませんでした</div>;
  }
  const url = anime2url(animes.data.data.anime);
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
        <div
          className={"text-center"}
        >
          <h1 className={"text-3xl"}>{animes.data.data.anime.title}</h1>
          {animes.data.data.anime.isAvailable===1&&<p>配信ページ： <Link href={url} target={"_blank"} referrerPolicy={"no-referrer"}>{url}</Link></p>}
        </div>
      </section>
      <section className={"m-3 p-3 "}>
        <div
          className={"flex flex-col lg:flex-row lg:flex-wrap justify-center"}
        >
          {episodesComponent}
        </div>
      </section>
    </main>
  );
};
export default Anime;
