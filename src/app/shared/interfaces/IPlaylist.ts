import { IMusic } from "./IMusic";


export interface IPlaylist {
  id: string,
  name: string,
  urlImage?: string,
  musics?: IMusic[]
}