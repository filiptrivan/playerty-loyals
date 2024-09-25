import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CacheService implements OnDestroy, OnInit {
  private readonly apiUrl = environment.apiUrl;

  constructor() {
  }

  ngOnInit(){
  }

  setData(key: string, data: string, timeoutMinutes: number){
    localStorage.setItem(key, `${data}?${timeoutMinutes}}`);
  }

  getData(key: string){
    return localStorage.getItem(key);
  }

  ngOnDestroy(): void {
  }
}