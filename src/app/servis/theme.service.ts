import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject (LocalStorageService);
  defaultTheme: string = 'light';
  defaultColorMode:string = 'white';

  private themeSubject$ = new BehaviorSubject<string>(this.defaultTheme);
  private colorModeSubject$ = new BehaviorSubject<string>(this.defaultColorMode);

  theme$: Observable<string> = this.themeSubject$.asObservable();
  colorMode$: Observable<string> = this.colorModeSubject$.asObservable();

  constructor(){
    const savedTheme = this.localStorageService.get<string>('theme');
    if(savedTheme){
      this.themeSubject$.next(savedTheme);
    };

    const savedColorMode = this.localStorageService.get<string>('colorMode');
    if(savedColorMode){
      this.colorModeSubject$.next(savedColorMode)
    };
  }

  setTheme(theme: string): void {
    this.themeSubject$.next(theme);
    this.localStorageService.set('theme',theme);

    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('p-dark');
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('p-dark');
      htmlElement.classList.remove('dark');
    }
  }

  setColorMode(colorMode: string): void {
    this.colorModeSubject$.next(colorMode);
    this.localStorageService.set('colorMode',colorMode);
  }
}
