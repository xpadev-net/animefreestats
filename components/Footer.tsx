const Footer = () => {
  return (
    <footer className={"w-full bg-slate-700 text-center text-white py-3"}>
      <span className={""}>
        Powered by{" "}
        <a
          href={"https://github.com/xpadev-net/"}
          target={"_blank"}
          referrerPolicy={"no-referrer"}
          rel="noreferrer"
        >
          xpadev-net
        </a>{" "}
        / Contact:{" "}
        <a
          href={"https://twitter.com/xpadev"}
          target={"_blank"}
          referrerPolicy={"no-referrer"}
          rel="noreferrer"
        >
          @xpadev
        </a>
      </span>
    </footer>
  );
};
export { Footer };
