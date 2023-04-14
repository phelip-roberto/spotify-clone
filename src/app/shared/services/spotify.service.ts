import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';

import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../Interfaces/IMusic';
import { ConvertSpotifyArtistToIArtist, ConvertSpotifyPlaylistToIPlaylist, ConvertSpotifySinglePlaylistToIPlaylist, ConvertSpotifyTrackToIMusic, ConvertSpotifyUserToIUser } from '../utils/spotifyHelper';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  user!: IUser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inituser() {
    if(!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;

    }catch(ex){
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = ConvertSpotifyUserToIUser(userInfo);
  }

  getLoginUrl() {
    const authEndpoint = `${environment.authEndpoint}?`;
    const clientId = `client_id=${environment.spotifyId}&`;
    const redirectUrl = `redirect_uri=${environment.redirectUrl}&`;
    const scopes = `scope=${environment.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  getUrlCallbackToken() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getUserPlayslist(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
    return playlists.items.map(ConvertSpotifyPlaylistToIPlaylist);
  }

  async getPlaylistMusics(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;
    
    const playlist = ConvertSpotifySinglePlaylistToIPlaylist(playlistSpotify);

    const spotifyMusics = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musics = spotifyMusics.items.map((music: any) => ConvertSpotifyTrackToIMusic(music.track as SpotifyApi.TrackObjectFull))
    
    return playlist;
  }


  async getTopArtists(limit = 10):Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(ConvertSpotifyArtistToIArtist);
  }

  async getMusics(offset=0, limit=50): Promise<IMusic[]>{
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map(x => ConvertSpotifyTrackToIMusic(x.track));
  }

  async playMusic(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic>{
    const spotifyMusic = await this.spotifyApi.getMyCurrentPlayingTrack();
    return ConvertSpotifyTrackToIMusic(spotifyMusic.item);
  }

  async previousMusic(){
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}