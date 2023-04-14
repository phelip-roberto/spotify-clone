
import { IMusic } from "../Interfaces/IMusic";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IArtist } from "../interfaces/IArtist";

export function newArtista(): IArtist {
  return {
    id: '',
    urlImage: '',
    name: '',
    musics: []
  };
}

export function newMusica(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      urlImage: '',
      name: '',
    },
    artists: [],
    time: '',
    title: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    urlImage: '',
    name: '',
    musics: []
  }
}