import { site2name } from "../libraries/site2name";
import Link from "next/link";

type props = {
  value: episode;
};

const EpisodeItem = ({ value }: props) => {
  const date = new Date(value.freeEndAt * 1000);
  return (
    <Link
      href={`/episode/${value.url}`}
      className={
        "bg-slate-200 flex my-1 mx-1 px-10 py-2 rounded w-full lg:w-5/12 hover:bg-slate-300"
      }
    >
      <div className={"flex flex-col"}>
        <span className={"text-xl"}>{value.episodeTitle}</span>
        <span className={"text-sm"}>
          {value.title} / {site2name(value.site)}
        </span>
        <span className={"text-sm"}>
          配信期限：{date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      </div>
    </Link>
  );
};
export { EpisodeItem };
