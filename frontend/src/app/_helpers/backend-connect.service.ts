import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class BackendConnectService {
  private AUTH_SERVER_ADDRESS: string;

  constructor(public platform: Platform) {
    const local: string = 'http://localhost:5000';
    const remote: string = 'https://lochapp.com';
    if (
      (platform.is('mobileweb') || platform.is('desktop')) &&
      window.location.href.indexOf('localhost') > 0
    )
      this.AUTH_SERVER_ADDRESS = local;
    else this.AUTH_SERVER_ADDRESS = remote;
  }

  getAddress(): string {
    return this.AUTH_SERVER_ADDRESS + '/api';
  }

  getHost(): string {
    return this.AUTH_SERVER_ADDRESS;
  }
}
