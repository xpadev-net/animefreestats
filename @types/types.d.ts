type episode = {
  title: string;
  episodeTitle: string;
  url: string;
  anime: string;
  isAvailable: number;
  freeEndAt: number;
  site: number;
}
type episodes = {
  data: episode[];
  count: number;
}
type anime = {
  title: string;
  anime: string;
  isAvailable: number;
  site: number;
}
type animes = {
  data: anime[];
  count: number
}