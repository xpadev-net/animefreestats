import { site2name } from "../libraries/site2name";
import Link from "next/link";

type props = {
  value: animeItem;
};

const AnimeItem = ({ value }: props) => {
  return (
    <Link
      href={`/animes/${value.anime}`}
      className={
        `${value.isAvailable?"bg-slate-200":"bg-gray-600 text-gray-400"} flex my-1 mx-1 px-10 py-2 rounded w-full lg:w-5/12 hover:bg-slate-300`
      }
    >
      <div className={"flex flex-col w-full"}>
        <span className={"text-xl overflow-ellipsis whitespace-nowrap overflow-hidden"}>{!value.isAvailable&&<span>[配信終了]</span>}{value.title}</span>
        <span className={"text-sm"}>{site2name(value.site)}</span>
      </div>
    </Link>
  );
};
export { AnimeItem };
