import { site2name } from "../libraries/site2name";
import Link from "next/link";

type props = {
  value: searchEpisode;
};

const EpisodeItem = ({ value }: props) => {
  const date = value.freeEndAt===32503647600?"不明":new Date((value.freeEndAt||0) * 1000).toLocaleString();
  return (
    <Link
      href={`/episodes/${value.url}`}
      className={
        `${value.isAvailable===0?"bg-gray-600 text-gray-400":value.freeEndAt===null?"bg-gray-400 text-gray-600":"bg-slate-200"} flex my-1 mx-1 px-10 py-2 rounded w-full lg:w-5/12 hover:bg-slate-300`
      }
    >
      <div className={"flex flex-col w-full"}>
        <span className={"text-xl overflow-ellipsis whitespace-nowrap overflow-hidden"}>{value.episodeTitle}</span>
        <span className={"text-sm"}>
          {value.title} / {site2name(value.site)}
        </span>
        <span className={"text-sm"}>
          {value.isAvailable===0?"配信終了":value.freeEndAt===null?"無料配信なし":`配信期限：${date}`}
        </span>
      </div>
    </Link>
  );
};
export { EpisodeItem };
