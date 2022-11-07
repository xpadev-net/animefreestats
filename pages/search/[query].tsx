import Head from "next/head";

const Search = () => {
  return (
    <main className={"container mx-auto"}>
      <Head>
        <title>{`AnimeFreeStats`}</title>
        <meta
          name="description"
          content="アニメの無料配信情報を一括で見れるサイトです"
        />
      </Head>
    </main>
  );
};
export default Search;
