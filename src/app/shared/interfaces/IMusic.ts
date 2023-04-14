export interface IMusic {
  id: string,
  title: string,
  artists: {
    id: string,
    name: string
  }[],
  album: {
    id: string,
    name: string,
    urlImage?: string
  },
  time: string
}