import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/shared/services/spotify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback() {
    const token = this.spotifyService.getUrlCallbackToken();
    if(!!token){
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/app/dashboard']);
    }
  }

  abirPaginaLogin() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

}
