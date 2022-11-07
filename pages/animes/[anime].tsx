import Head from "next/head";
import useSWR from "swr";
import {fetcher} from "../../libraries/fetcher";
import {useMemo} from "react";
import {EpisodeItem} from "../../components/EpisodeItem";
import {useRouter} from "next/router";

const Anime = () => {
  const router = useRouter();

  const query = function(query){if (typeof query==="string") return encodeURI(query as string);return query?query[0]:""}(router.query.anime);
  const animes = useSWR<anime>(
    `//animeinfo.xpadev.net/api/v1/anime?query=${query}`,
    fetcher
  );
  const episodesComponent = useMemo(() => {
    if (animes.error||!animes.data) {
      return <></>;
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
    return <div className={"text-red-500"}>failed to load resources</div>;
  }
  if (!animes.data) {
    return <div className={"text-gray-500"}>loading...</div>;
  }
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
          <h1 className={"text-3xl"}>{animes.data.data.anime.title}</h1>
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
