const sites: { [key: number]: string } = {
  1: "Abema",
  2: "GYAO!",
  4: "ニコニコ動画",
};
const site2name = (site: number): string => {
  return sites[site] as string;
};
export { site2name };
