import { addMilliseconds, format } from "date-fns";

import { IPlaylist } from "../Interfaces/IPlaylist";

import { newMusica, newPlaylist } from "./factories";
import { IUser } from "../interfaces/IUser";
import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../Interfaces/IMusic";


export function ConvertSpotifyUserToIUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser{
  return {
    id: user.id,
    name: user.display_name,
    urlImage: user?.images?.pop()?.url
  }
}

export function ConvertSpotifyPlaylistToIPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  return {
    id: playlist.id,
    name: playlist.name,
    urlImage: playlist?.images?.pop()?.url
  };
}

export function ConvertSpotifySinglePlaylistToIPlaylist(playlist: SpotifyApi.SinglePlaylistResponse ): IPlaylist {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    urlImage: playlist?.images?.shift()?.url,
    musics: []
  }

}

export function ConvertSpotifyArtistToIArtist(spotifyArtista: SpotifyApi.ArtistObjectFull) :  IArtist{
  return {
    id: spotifyArtista.id,
    urlImage: spotifyArtista?.images?.sort((a: any,b: any) => a.width - b.width)?.pop()?.url,
    name: spotifyArtista.name
  };
}

export function ConvertSpotifyTrackToIMusic(spotifyTrack: SpotifyApi.TrackObjectFull | null) : IMusic{
  
  if (!spotifyTrack)
    return newMusica();

  const msParaMinutos = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  
  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      urlImage: spotifyTrack?.album?.images?.shift()?.url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map((artist: any) => ({
      id: artist.id,
      name: artist.name
    })),
    time: msParaMinutos(spotifyTrack.duration_ms),
  }
}