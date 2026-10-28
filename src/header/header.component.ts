import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../app/servis/local-storage.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MainLink } from '../app/interfaces/MainLink';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../app/servis/theme.service';
import { AsyncPipe } from '@angular/common';
import {SelectButtonModule}from 'primeng/selectbutton';
import { usePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

@Component({
  selector: 'app-header',
  imports: [NgClass,ToggleSwitchModule, SelectButtonModule, FormsModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  LocalStorageService: LocalStorageService = inject(LocalStorageService);
  themeService: ThemeService = inject(ThemeService);
  
  valueTimeDate!: string;
  timeUpdate!: any;
  writtenText!: string;
  companyName: string = 'румтибет';
  isLoading: boolean = false;
  changingValue: boolean = true;
  numberClicks: number = 0;
  selectedTheme: string = 'Aura';
  
  mainLink: MainLink [] = [
    {
      name:'Главная',
      link: '/'
    },
    {
      name:'Пользователи',
      link: '/users'
    }
  ];

  themeOptions = [
    {label: 'Aura', value: 'Aura'},
    {label: 'Lara', value: 'Lara'},
    {label: 'Nora', value: 'Nora'},
  ];
  
  constructor() {
    this.saveVisitcount();
    this.timeOutput();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    const savedTheme = this.LocalStorageService.get<string>('app-theme');
    if(savedTheme){
      this.selectedTheme = savedTheme;
      this.onThemeChange(savedTheme);
    }
  }

  ngOnDestroy(): void {
  if (this.timeUpdate) {
    clearInterval(this.timeUpdate); 
  }
}

  subtraction() {
    if(this.numberClicks > 0) {
      this.numberClicks -= 1;
    }
  }
  
  addition() {
    this.numberClicks += 1;
  }
  
  switchingTasks() {
    this.changingValue = !this.changingValue; 
  }
  
  private saveVisitcount(): void {
    const savedCount = this.LocalStorageService.get<number>('visitCount') ?? 0;
    const newCount = savedCount + 1;
    this.LocalStorageService.set('visitCount', newCount);
  }

  private timeOutput():void {
    this.valueTimeDate = new Date().toLocaleString('ru-RU');
    this.timeUpdate  = setInterval (() => {
      this.valueTimeDate = new Date().toLocaleString('ru-RU');
    },1000)
  }

  onThemeToggle(isDark: boolean) {
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }

  onThemeChange(themeName: string) {
    this.selectedTheme = themeName;
    let preset;
    if(themeName === 'Nora') {
      preset = Nora;
    } else if( themeName === 'Lara') {
      preset = Lara;
    } else {
      preset = Aura
    }
    usePreset(preset);
    this.LocalStorageService.set('app-theme', themeName);
  }
  

}
