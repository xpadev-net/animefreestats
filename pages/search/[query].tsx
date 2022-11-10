import Head from "next/head";
import useSWR from "swr";
import {fetcher} from "../../libraries/fetcher";
import {useMemo} from "react";
import {EpisodeItem} from "../../components/EpisodeItem";
import {AnimeItem} from "../../components/AnimeItem";
import {useRouter} from "next/router";

const Search = () => {
  const router = useRouter();

  const query = function(query){if (typeof query==="string") return encodeURI(query as string);return query?query[0]:""}(router.query.query);
  const animes = useSWR<searchAnimes>(
    `//animeinfo.xpadev.net/api/v1/search/animes?limit=50&query=${query}`,
    fetcher
  );
  const episodes = useSWR<searchEpisodes>(
    `//animeinfo.xpadev.net/api/v1/search/episodes?limit=50&query=${query}`,
    fetcher
  );
  const episodesComponent = useMemo(() => {
    if (episodes.error) {
      return <div className={"text-red-500 text-center"}>データの読み込みに失敗しました</div>;
    }
    if (!episodes.data) {
      return <div className={"text-gray-500 text-center"}>読み込んでいます...</div>;
    }
    if (episodes.data.data.length === 0){
      return <div className={"text-gray-500 text-center"}>該当する話は見つかりませんでした</div>;
    }
    return (
      <>
        {episodes.data.data.map((val, i) => {
          return <EpisodeItem key={i} value={val} />;
        })}
      </>
    );
  }, [episodes]);
  const animesComponent = useMemo(() => {
    if (animes.error) {
      return <div className={"text-red-500 text-center"}>データの読み込みに失敗しました</div>;
    }
    if (!animes.data) {
      return <div className={"text-gray-500 text-center"}>読み込んでいます...</div>;
    }
    if (animes.data.data.length === 0){
      return <div className={"text-gray-500 text-center"}>該当するタイトルは見つかりませんでした</div>;
    }
    return (
      <>
        {animes.data.data.map((val, i) => {
          return <AnimeItem key={i} value={val} />;
        })}
      </>
    );
  }, [animes]);
  return (
    <main className={"container mx-auto"}>
      <Head>
        <title>{`${decodeURI(query)} - AnimeFreeStats`}</title>
        <meta
          name="description"
          content="アニメの無料配信情報を一括で見れるサイトです"
        />
      </Head>
      <section className={"m-3 p-3 "}>
        <div
          className={"flex flex-col lg:flex-row lg:flex-wrap justify-center"}
        >
          {animesComponent}
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
export default Search;
