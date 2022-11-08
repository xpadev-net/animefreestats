const baseUrl:{[key in "episode"|"title"]:{[key:number]:string}} = {
  episode: {
    1: "https://abema.tv/video/episode/",
    2: "https://gyao.yahoo.co.jp/episode/",
    3: "https://www.nicovideo.jp/watch/"
  },
  title: {
    1: "https://abema.tv/video/title/",
    2: "https://gyao.yahoo.co.jp/title/",
    3: "https://ch.nicovideo.jp/"
  }
}
const episode2url = (episode:searchEpisode) => {
  return `${baseUrl.episode[episode.site]}${episode.url}`
}
const anime2url = (anime:animeItem) => {
  return `${baseUrl.title[anime.site]}${anime.anime}`
}
export {episode2url,anime2url};