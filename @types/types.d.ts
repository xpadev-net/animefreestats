type searchEpisode = {
  title: string;
  episodeTitle: string;
  url: string;
  anime: string;
  isAvailable: number;
  freeEndAt: number|null;
  site: number;
}
type searchEpisodes = {
  data: searchEpisode[];
  count: number;
}
type animeItem = {
  title: string;
  anime: string;
  isAvailable: number;
  site: number;
}
type searchAnimes = {
  data: animeItem[];
  count: number
}
type episodeItem = {
  anime: string;
  url: string;
  title: string;
  episodeTitle: string;
  freeEndAt: number | null;
  isDRM: number;
  isRental: number;
  addAt: number;
  isAvailable: number;
  site: number;
}
type anime = {
  data:{
    anime:animeItem;
    episodes: episodeItem[];
  };
}
type episode = {
  data: episodeItem;
}