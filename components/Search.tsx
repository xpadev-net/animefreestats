import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [value]
  );
  const onEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (value.length > 1 && e.key === "Enter") {
        void router.push(`/search/${value}`);
      }
    },
    [value]
  );
  return (
    <input
      type="text"
      className={
        "bg-slate-300 text-black border border-gray-300 sm:text-sm rounded-lg block w-1/4 pl-2 m-1"
      }
      placeholder={"検索"}
      value={value}
      onChange={onChange}
      onKeyUp={onEnter}
    />
  );
};
export { Search };
