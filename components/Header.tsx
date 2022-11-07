import { NavigationItem } from "./NavigationItem";
import { Search } from "./Search";

const Header = () => {
  return (
    <header className={"w-full bg-slate-700 "}>
      <div className={"container mx-auto flex justify-between"}>
        <NavigationItem href={"/"}>AnimeFreeStats</NavigationItem>
        <Search />
      </div>
    </header>
  );
};
export { Header };
