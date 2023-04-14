import { IMusic } from "./IMusic";

export interface IArtist {
  id: string,
  name: string,
  urlImage?: string,
  musics?: IMusic[]
}