const sites: { [key: number]: string } = {
  1: "ABEMA",
  2: "GYAO!",
  3: "ニコニコ動画(Nアニメ)",
  4: "dアニメストア ニコニコ支店"
};
const site2name = (site: number): string => {
  return sites[site] as string;
};
export { site2name };
