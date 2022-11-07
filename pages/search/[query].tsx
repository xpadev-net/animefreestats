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
  const animes = useSWR<animes>(
    `//animeinfo.xpadev.net/api/v1/search/animes?limit=50&query=${query}`,
    fetcher
  );
  const episodes = useSWR<episodes>(
    `//animeinfo.xpadev.net/api/v1/search/episodes?limit=50&query=${query}`,
    fetcher
  );
  const episodesComponent = useMemo(() => {
    if (episodes.error) {
      return <div className={"text-red-500"}>failed to load resources</div>;
    }
    if (!episodes.data) {
      return <div className={"text-gray-500"}>loading...</div>;
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
      return <div className={"text-red-500"}>failed to load resources</div>;
    }
    if (!animes.data) {
      return <div className={"text-gray-500"}>loading...</div>;
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
        <title>{`AnimeFreeStats`}</title>
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
